from django.contrib.auth.models import User
from django.db.models import Q
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Category, Product
from .serializers import (
    CategorySerializer,
    EchoSerializer,
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
    return Response({
        'message': 'Hello from Django REST Framework',
        'status': 'success',
    })


@api_view(['GET'])
def time_api(request):
    return Response({
        'server_time': timezone.now().isoformat(),
        'status': 'success',
    })


@api_view(['GET', 'POST'])
def echo_api(request):
    if request.method == 'POST':
        serializer = EchoSerializer(data=request.data)
    else:
        serializer = EchoSerializer(data={'text': request.query_params.get('text', '')})

    serializer.is_valid(raise_exception=True)
    return Response({
        'echo': serializer.validated_data.get('text', ''),
        'method': request.method,
        'status': 'success',
    })


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Product.objects.select_related('category').all()
        search = self.request.query_params.get('search')
        category_slug = self.request.query_params.get('category')

        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))

        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductDetailSerializer
    permission_classes = [AllowAny]


class UserRegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class AuthTokenView(TokenObtainPairView):
    serializer_class = TokenObtainPairWithUserSerializer


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
