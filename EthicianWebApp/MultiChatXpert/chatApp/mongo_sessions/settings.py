from django.conf import settings
from pymongo.collection import Collection
from django.core.exceptions import ImproperlyConfigured

# Use DB_COLLECTION directly from Django settings
DB_COLLECTION = settings.DB_COLLECTION  # Reference the MongoDB collection

# Set the TTL for sessions
MONGO_SESSIONS_TTL = getattr(settings, 'MONGO_SESSIONS_TTL', settings.SESSION_COOKIE_AGE)

# Ensure DB_COLLECTION is a valid Collection and set up indexes if not already present
if isinstance(DB_COLLECTION, Collection):
    index_info = DB_COLLECTION.index_information()
    if 'session_key_1' not in index_info:
        DB_COLLECTION.create_index('session_key', unique=True)
    if 'creation_date_1' not in index_info:
        DB_COLLECTION.create_index('creation_date', expireAfterSeconds=MONGO_SESSIONS_TTL)
else:
    raise ImproperlyConfigured("DB_COLLECTION is not a valid MongoDB Collection.")