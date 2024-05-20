# import section

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
import mysql.connector
from models import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


# config fastAPI

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

app.mount("/static", StaticFiles(directory="../static"))
app.mount("/javascript", StaticFiles(directory="../javascript"))
app.mount("/templates", StaticFiles(directory="../templates"))

@app.get("/")
async def get_index():
    return FileResponse("../templates/register.html")

# funzioni

def username_exists(username):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM utenti WHERE username = %s", (username,))
    result = cursor.fetchone()
    conn.close()
    return result is not None

def username_pass_exists(username, password):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM utenti WHERE username = %s AND password = %s", (username, password))
    result = cursor.fetchone()
    conn.close()
    return result is not None



# Register


@app.post("/register")
def register(user: User):
    if username_exists(user.username):
        raise HTTPException(status_code=400, detail="username already exist")
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO utenti (username, password) VALUES (%s, %s)",
                    (user.username, user.password))
    conn.commit()
    conn.close()
    return {
        "msg": "Utente inserito con successo"
    }


# Login


@app.post("/login")
def login(login: Login):
    if username_pass_exists(login.username, login.password):
        return {
            "msg": "Logged"
        }
    else :
        raise HTTPException(status_code=400, detail="not found")

# New Product

@app.post("/newproduct")
def newproduct(prodotto: Prodotto):
    if username_pass_exists(prodotto.username, prodotto.password):
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO prodotti (nome, username, descrizione, url_immagine, prezzo) VALUES (%s, %s, %s, %s, %s)",
                    (prodotto.nome, prodotto.username, prodotto.descrizione, prodotto.url_immagine, prodotto.prezzo))
        result = conn.commit()
        conn.close()
        return {
            "msg": "Newproduct"
        }
    else:
        raise HTTPException(status_code=400, detail="something went wrong")

# View Product


@app.get("/products")
async def get_all_products():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT nome, username, descrizione, url_immagine, prezzo FROM prodotti")
    products = cursor.fetchall()
    conn.close()
    return products