# models.py
from django.db import models

class UploadedFileModel(models.Model):
    file = models.FileField(upload_to='uploads/')
    file_data = models.TextField()  # Adjust this field based on your processed data type

    def __str__(self):
        return self.file.name

class UserAccount(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

class Conversation(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    conversation_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)