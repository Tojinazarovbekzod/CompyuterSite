from rest_framework import serializers


class EchoSerializer(serializers.Serializer):
    text = serializers.CharField(required=False, allow_blank=True)
