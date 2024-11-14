from django.http import JsonResponse
from .PromptAPICalls.sendTextPrompt import textPrompt
from .PromptAPICalls.sendMediaPrompt import mediaPrompt
from .PromptAPICalls.fileHandling import fileUpload
from .models import UploadedFileModel  # Import UploadedFile model
from .models import Conversation
from .serializers import ConversationSerializer
from django.utils.timezone import now
from django.middleware.csrf import get_token
from django.core.files.uploadedfile import InMemoryUploadedFile

import json
from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserAccountSerializer
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from django.conf import settings
import datetime

#=================================================================
#======================== Login Classes ==========================
#=================================================================

class RegisterView(APIView):
    def post(self, request):
        serializer = UserAccountSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            add_user(data['username'], data['email'], data['password'])
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = UserAccountSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user = get_user(data['username'])
            if user and user['password'] == data['password']:
                return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#==================================================================
#====================== Backend Health Check ======================
#==================================================================

def health_check(request):
    return JsonResponse({'status': 'ok'})

#==================================================================
#========================= MongoDB Functions ======================
#==================================================================

def get_user_collection():
    return settings.mongo_db['users']

def get_conversation_collection():
    return settings.mongo_db['conversations']

def add_user(username, email, password):
    user_collection = get_user_collection()
    user_data = {
        'username': username,
        'email': email,
        'password': password
    }
    user_collection.insert_one(user_data)

def get_user(username):
    user_collection = get_user_collection()
    return user_collection.find_one({'username': username})

def add_conversation(user_id, conversation_text):
    conversation_collection = get_conversation_collection()
    conversation_data = {
        'user_id': user_id,
        'conversation_text': conversation_text,
        'timestamp': datetime.datetime.now()
    }
    conversation_collection.insert_one(conversation_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_conversation(request):
    user = request.user
    conversation_text = request.data.get("conversation_text", "")
    timestamp = now()

    if conversation_text:
        conversation = Conversation.objects.create(
            user_id=user,
            conversation_text=conversation_text,
            timestamp=timestamp
        )
        return Response({"message": "Conversation saved successfully!"}, status=status.HTTP_201_CREATED)
    return Response({"error": "Conversation text is required"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_conversations(request):
    csrf_token = get_token(request)
    print("CSRF Token:", csrf_token)
    user = request.user
    conversations = Conversation.objects.filter(user_id=user).order_by('-timestamp')
    serializer = ConversationSerializer(conversations, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

def index(request):
    return render(request, 'index.html')

#===========================================================
#===================== LLM Interactions ====================
#===========================================================
import logging
logger = logging.getLogger(__name__)

@csrf_exempt

@api_view(['POST', 'GET'])
@permission_classes([AllowAny])  # Adjust permissions as needed
def analyze_text(request):
    logger.info("Request received at analyze_text endpoint.")
    print("Processing POST request to 'analyze_text' endpoint")

    if request.method == 'POST':
        try:
            # Retrieve data from request
            text = request.POST.get('text', '')
            selected_experts = json.loads(request.POST.get('selected_experts', '[]')) or []
            currentLLM = request.POST.get('selected_option', None)
            uploaded_files = request.FILES.getlist('file')

            # Log inputs for debugging
            print(f"Text: {text}")
            print(f"Selected Experts: {selected_experts}")
            print(f"Current LLM: {currentLLM}")
            print(f"Number of Files: {len(uploaded_files)}")

            # Process file uploads if any
            file_data = []
            if uploaded_files:
                for file in uploaded_files:
                    file_info = fileUpload(file)
                    print(f"Processed file info: {file_info}")  # Log processed file data
                    file_data.append(file_info)

                # Use `mediaPrompt` to handle text with file data
                result = mediaPrompt(text, selected_experts, currentLLM, file_data)
            else:
                # Use `textPrompt` if no files are uploaded
                result = textPrompt(text, currentLLM, selected_experts)

            # Ensure result is a dictionary for consistent JSON response structure
            if not isinstance(result, dict):
                result = {'output': result}

            # Store result in session for later retrieval and return it
            request.session['output'] = json.dumps(result)  # Store as JSON string for consistency
            print("Returning response in views.py:", result)
            return JsonResponse(result)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            # General exception logging for any other unforeseen errors
            print(f"Unexpected error: {e}")
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'GET':
        # Retrieve the latest response from the session for GET requests
        result = request.session.get('output')
        if result:
            return JsonResponse(json.loads(result))  # Load from JSON string
        else:
            return JsonResponse({'error': 'No prompt result available'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)