from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from auth import create_access_token, decode_access_token
from config.database import MONGODB_URL, client

# retrieve OAuth2 scheme for token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


# login request model
class LoginRequest(BaseModel):
    username: str
    password: str


app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # only need GET and POST methods
    allow_headers=["*"],
)


# dependency to get current user from token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return username


# endpoint for user login
@app.post("/api/login")
async def login(req: LoginRequest):
    if not req.username or not req.password:
        raise HTTPException(status_code=400, detail="Username and password required")
    if req.username != "matthew" or req.password != "matthew":
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token(req.username)
    return {"access_token": token, "token_type": "bearer"}


# connect to the database
db = client.m62

# defining API endpoints


# endpoint for Generative AI Adoption Rates, including overall, work, and non-work
@app.get("/api/genai_adoption")
async def get_genai_adoption(current_user: str = Depends(get_current_user)):
    # try to fetch documents from the genai_adoption collection
    try:
        docs = await db.genai_adoption.find().to_list(1000)
    # if not successful, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    # convert all ObjectId to string for JSON serialization
    for doc in docs:
        doc["_id"] = str(doc["_id"])

    # return list of documents
    return docs


# endpoint for Model Performance Metrics
@app.get("/api/model_performance")
async def get_model_performance(current_user: str = Depends(get_current_user)):
    # try to fetch documents from the model_performance collection
    try:
        docs = await db.model_performance.find().to_list(1000)
    # if not successful, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    # convert all ObjectId to string for JSON serialization
    for doc in docs:
        doc["_id"] = str(doc["_id"])

    # return list of documents
    return docs


# endpoint for Model Releases, including date and key innovation
@app.get("/api/model_releases")
async def get_model_releases(current_user: str = Depends(get_current_user)):
    # try to fetch documents from the model_releases collection
    try:
        docs = await db.model_releases.find().to_list(1000)
    # if not successful, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    # convert all ObjectId to string for JSON serialization
    for doc in docs:
        doc["_id"] = str(doc["_id"])

    # return list of documents
    return docs


# endpoint to check health of the API and MongoDB connection
@app.get("/api/health")
async def health(current_user: str = Depends(get_current_user)):
    # try to ping MongoDB server
    try:
        await client.admin.command("ping")
    # if ping fails, raise HTTP 503 error
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"MongoDB unreachable: {e}")

    # try to count documents in each collection
    try:
        counts = {
            "genai_adoption": await db.genai_adoption.count_documents({}),
            "model_performance": await db.model_performance.count_documents({}),
            "model_releases": await db.model_releases.count_documents({}),
        }
    # if counting fails, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error when counting collections: {e}")

    # return health status and collection counts
    return {"ok": True, "mongodb_url": MONGODB_URL, "counts": counts}
