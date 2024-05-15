from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
import mysql.connector
from models import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


config = {
    "user": "root",
    "host": "localhost",
    "database": "progettofinale"
}

app.mount("/static", StaticFiles(directory="../static"), name="static")
app.mount("/javascript", StaticFiles(directory="../javascript"), name="javascript")

@app.get("/")
async def get_index():
    return FileResponse("../templates/main.html")

@app.post("/register")
def register(user: User):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)",
                    (user.username, user.password))
    conn.commit()
    conn.close()
    return {
        "msg": "Utente inserito con successo"
    }
