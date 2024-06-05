# import section 
useralphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'
passwordalphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!#$%&"-.?'

from pydantic import BaseModel, Field


# Register
class User(BaseModel):
    username: str = Field(..., min_length=3, max_length=20, pattern=r'^[a-zA-Z0-9_]+$')
    password: str = Field(..., min_length=8, pattern=r'^[a-zA-Z0-9_!#$%&"-.?]*$')

# Login
class Login(BaseModel):
    username: str
    password: str 

# Prodotto
class Prodotto(BaseModel):
    nome: str
    username: str = Field(..., min_length=3, max_length=20, pattern=r'^[a-zA-Z0-9_]+$')
    password: str = Field(..., min_length=8, pattern=r'^[a-zA-Z0-9_!#$%&"-.?]*$')
    descrizione: str
    prezzo: float
    url_immagine: str

# View Prodotto
class ProdottoView(BaseModel):
    nome: str
    username: str = Field(..., min_length=3, max_length=20, pattern=r'^[a-zA-Z0-9_]+$')
    descrizione: str
    prezzo: float
    url_immagine: str


# Recensione
class Recensione(BaseModel):
    descrizione: str
    valutazione: int
    prodottoid: int
    utenteid: int
