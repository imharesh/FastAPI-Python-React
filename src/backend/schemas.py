from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    
class UserResponse(BaseModel):
    id: UUID
    username: str
    email: str
    first_name: str
    last_name: str

    class Config:
        from_attributes = True


class UserInDB(UserBase):
    id: UUID

    class Config:
        from_attributes = True