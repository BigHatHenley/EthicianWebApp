# models.py
from django.db import models

class UploadedFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    file_data = models.TextField()  # Adjust this field based on your processed data type

    def __str__(self):
        return self.file.name