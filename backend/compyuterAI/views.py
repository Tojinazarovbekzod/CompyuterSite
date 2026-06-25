from django.contrib.auth.models import User
from django.db import IntegrityError
from django.db.models import Q
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Brand, Category, Cart, CartItem, Order, Product
from .serializers import (
    BrandSerializer,
    CartSerializer,
    CategorySerializer,
    EchoSerializer,
    OrderSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    RegisterSerializer,
    TokenObtainPairWithUserSerializer,
    UserSerializer,
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'limit'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data,
        })


@api_view(['GET'])
def hello_api(request):
    return Response({'message': 'Hello from Django REST Framework', 'status': 'success'})


@api_view(['GET'])
def time_api(request):
    return Response({'server_time': timezone.now().isoformat(), 'status': 'success'})


@api_view(['GET', 'POST'])
def echo_api(request):
    if request.method == 'POST':
        serializer = EchoSerializer(data=request.data)
    else:
        serializer = EchoSerializer(data={'text': request.query_params.get('text', '')})

    serializer.is_valid(raise_exception=True)
    return Response({'echo': serializer.validated_data.get('text', ''), 'method': request.method, 'status': 'success'})


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Product.objects.select_related('category', 'brand').all()
        search = self.request.query_params.get('search')
        category_slug = self.request.query_params.get('category')
        brand_slug = self.request.query_params.get('brand')
        filter_type = self.request.query_params.get('filter')

        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(short_description__icontains=search) | Q(description__icontains=search))

        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        if brand_slug:
            queryset = queryset.filter(brand__slug=brand_slug)

        if filter_type == 'new':
            queryset = queryset.filter(is_new=True)
        elif filter_type == 'discount':
            queryset = queryset.filter(discount_price__isnull=False)
        elif filter_type == 'gaming':
            queryset = queryset.filter(is_gaming=True)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category', 'brand').all()
    serializer_class = ProductDetailSerializer
    permission_classes = [AllowAny]


class UserRegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = serializer.save()
        except IntegrityError:
            return Response({'detail': 'A user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        refresh = RefreshToken.for_user(user)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token), 'user': UserSerializer(user).data}, status=status.HTTP_201_CREATED)


class AuthTokenView(TokenObtainPairView):
    serializer_class = TokenObtainPairWithUserSerializer


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class CartView(generics.GenericAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart, _ = Cart.objects.get_or_create(user=request.user, active=True)
        items = request.data.get('items', [])

        CartItem.objects.filter(cart=cart).delete()
        for item in items:
            product_id = item.get('product_id')
            quantity = item.get('quantity', 1)
            try:
                product = Product.objects.get(pk=product_id)
            except Product.DoesNotExist:
                continue
            CartItem.objects.create(cart=cart, product=product, quantity=quantity, unit_price=product.display_price)

        cart.refresh_from_db()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        cart = Cart.objects.filter(user=self.request.user, active=True).first()
        total = cart.total_amount if cart else 0
        serializer.save(user=self.request.user, cart=cart, total_amount=total)
        if cart:
            cart.active = False
            cart.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
