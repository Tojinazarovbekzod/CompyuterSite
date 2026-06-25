from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import datetime
import json


def hello_api(request):
    return JsonResponse({
        'message': 'Hello from Django API',
        'status': 'success',
    })


def time_api(request):
    return JsonResponse({
        'server_time': datetime.datetime.now().isoformat(),
        'status': 'success',
    })


@csrf_exempt
def echo_api(request):
    if request.method == 'POST':
        try:
            payload = json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid JSON payload',
            }, status=400)
        text = payload.get('text', '')
    else:
        text = request.GET.get('text', '')

    return JsonResponse({
        'echo': text,
        'method': request.method,
        'status': 'success',
    })
