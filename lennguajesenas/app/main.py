from fastapi import FastAPI
from app.endpoints import router

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI application"}

app.include_router(router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
