from django.http import JsonResponse
from .PromptAPICalls.textPrompt import textPrompt
from .PromptAPICalls.mediaPrompt import mediaPrompt
from .PromptAPICalls.fileSaving import save_and_process_file
from .models import UploadedFile  # Import UploadedFile model

import json
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserAccountSerializer
from django.http import HttpResponse
from .mongodb_access import add_user, get_user, add_conversation

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

def health_check(request):
    return JsonResponse({'status': 'ok'})

def save_conversation(request):
    if request.method == 'POST':
        user_id = request.POST['user_id']
        conversation_text = request.POST['conversation_text']
        add_conversation(user_id, conversation_text)
        return HttpResponse("Conversation saved successfully!")
    return render(request, 'conversation.html')

def index(request):
    return render(request, 'index.html')

def analyze_text(request):
    print("Processing POST request to 'multichatxpert' endpoint")
    if request.method == 'POST':
        text = request.POST.get('text', '')
        uploaded_file = request.FILES.get('file')
        selected_experts = request.POST.get('selected_experts', '[]')  # Get selected experts as JSON string
        currentLLM = request.POST.get('selected_option')

        try:
            selected_experts = json.loads(selected_experts)  # Parse JSON string to list
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid selected_experts data'}, status=400)

        num_active_experts = len(selected_experts)

        if num_active_experts == 0:
            prompt = text
        
        if uploaded_file:
            file_data = save_and_process_file(uploaded_file, UploadedFile)
            if file_data:
                result = mediaPrompt(prompt, currentLLM, file_data)
            else:
                # Handle error condition where file saving failed
                result = "Error processing file"
        else:
            result = textPrompt(prompt, currentLLM)
        
        print(result)
        
        request.session['output'] = result

        # Ensure that result is a JSON serializable object
        if isinstance(result, dict) or isinstance(result, list):
            print("Is serializable")
            return JsonResponse(result)  # Return JSON serializable data directly
        else:
            print("Not Serializable")
            return JsonResponse({'error': 'Result is not JSON serializable'}, status=400)

    elif request.method == 'GET':
        print("Got to GET")
        result = request.session.get('output', None)
        print("Result IS", result)
        
        if result is not None:
            return JsonResponse({'result': result})  # Return the result if available
        else:
            return JsonResponse({'error': 'No prompt result available'}, status=400)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)