# mongodb_test.py

import pymongo
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve MongoDB URI from environment variables
MONGO_URI = os.getenv('MONGO_URI')

# Create a MongoDB client
client = pymongo.MongoClient(MONGO_URI)

# Test connection
try:
    # Access a test database
    db = client['EthicianTestCluster1']
    
    # Check the connection
    server_info = client.server_info()
    print("MongoDB Connection Successful!")
    print("Server Info:", server_info)
    
    # List databases to verify connection
    databases = client.list_database_names()
    print("Databases:", databases)
    
except pymongo.errors.ServerSelectionTimeoutError as e:
    print("Failed to connect to MongoDB:", e)