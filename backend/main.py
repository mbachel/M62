from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config.database import client, MONGODB_URL

app = FastAPI()

#CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"], #only need GET method, since it's read-only
    allow_headers=["*"],
)

#connect to the database
db = client.m62

#Defining API endpoints

#endpoint for Generative AI Adoption Rates, including overall, work, and non-work
@app.get("/api/genai_adoption")
async def get_genai_adoption():
    #try to fetch documents from the genai_adoption collection
    try:
        docs = await db.genai_adoption.find().to_list(1000)
    #if not successful, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    #convert all ObjectId to string for JSON serialization
    for doc in docs:
        doc["_id"] = str(doc["_id"])

    #return list of documents
    return docs

#endpoint for Model Performance Metrics, including GPQA Diamond Reasoning, AIME 2025 Math, SWE Bench Coding, and Humanity's Last Exam
@app.get("/api/model_performance")
async def get_model_performance():
    #try to fetch documents from the model_performance collection
    try:
        docs = await db.model_performance.find().to_list(1000)
    #if not successful, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    #convert all ObjectId to string for JSON serialization
    for doc in docs:
        doc["_id"] = str(doc["_id"])

    #return list of documents
    return docs

#endpoint for Model Releases, including date and key innovation
@app.get("/api/model_releases")
async def get_model_releases():
    #try to fetch documents from the model_releases collection
    try:
        docs = await db.model_releases.find().to_list(1000)
    #if not successful, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    #convert all ObjectId to string for JSON serialization
    for doc in docs:
        doc["_id"] = str(doc["_id"])

    #return list of documents
    return docs

#endpoint to check health of the API and MongoDB connection
@app.get("/api/health")
async def health():
    #try to ping MongoDB server
    try:
        await client.admin.command("ping")
    #if ping fails, raise HTTP 503 error
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"MongoDB unreachable: {e}")

    #try to count documents in each collection
    try:
        counts = {
            "genai_adoption": await db.genai_adoption.count_documents({}),
            "model_performance": await db.model_performance.count_documents({}),
            "model_releases": await db.model_releases.count_documents({}),
        }
    #if counting fails, raise HTTP 500 error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error when counting collections: {e}")

    #return health status and collection counts
    return {"ok": True, "mongodb_url": MONGODB_URL, "counts": counts}