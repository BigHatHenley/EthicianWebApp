import rest_framework.serializers as drf_serializers

class UserAccountSerializer(drf_serializers.Serializer):
    username = drf_serializers.CharField(max_length=100)
    email = drf_serializers.EmailField()
    password = drf_serializers.CharField(max_length=255)

class ConversationSerializer(drf_serializers.Serializer):
    user_id = drf_serializers.CharField()
    conversation_text = drf_serializers.CharField()
    timestamp = drf_serializers.DateTimeField()