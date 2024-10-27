import routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
    
app = FastAPI(title="User Authentication API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(routes.router, prefix="/api/auth", tags=["Authentication"])



