from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path('hello/', views.hello_api, name='api-hello'),
    path('echo/', views.echo_api, name='api-echo'),
    path('time/', views.time_api, name='api-time'),
    path('categories/', views.CategoryListView.as_view(), name='api-categories'),
    path('products/', views.ProductListView.as_view(), name='api-products'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='api-product-detail'),
    path('auth/register/', views.UserRegisterView.as_view(), name='api-auth-register'),
    path('auth/login/', views.AuthTokenView.as_view(), name='api-auth-login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', views.UserProfileView.as_view(), name='api-auth-profile'),
]
