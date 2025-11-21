from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/m62")
client = AsyncIOMotorClient(MONGODB_URL)