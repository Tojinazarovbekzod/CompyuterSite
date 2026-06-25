from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EchoSerializer


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
