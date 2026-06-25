from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_api, name='api-hello'),
    path('echo/', views.echo_api, name='api-echo'),
    path('time/', views.time_api, name='api-time'),
]
