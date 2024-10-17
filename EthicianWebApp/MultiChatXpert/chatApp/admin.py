from django.contrib import admin
from .models import UserAccount, Conversation

admin.site.register(UserAccount)
admin.site.register(Conversation)