import rest_framework.serializers as drf_serializers
from .models import Conversation

class UserAccountSerializer(drf_serializers.Serializer):
    username = drf_serializers.CharField(max_length=100)
    email = drf_serializers.EmailField()
    password = drf_serializers.CharField(max_length=255)

class ConversationSerializer(drf_serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ['user_id', 'conversation_text', 'timestamp']