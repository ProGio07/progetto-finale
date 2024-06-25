# import section 
useralphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'
passwordalphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!#$%&"-.?'

from pydantic import BaseModel, Field, field_validator
from urllib.parse import urlparse


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
    nome: str = Field(..., min_lenght=1, max_length=255)
    username: str = Field(..., min_length=3, max_length=20, pattern=r'^[a-zA-Z0-9_]+$')
    password: str = Field(..., min_length=8, pattern=r'^[a-zA-Z0-9_!#$%&"-.?]*$')
    descrizione: str = Field(..., min_lenght=1, max_length=255)
    prezzo: float = Field(..., gt=0)
    url_immagine: str

    @field_validator('url_immagine')
    def validate_url(cls, v: str) -> str:
        parsed_url = urlparse(v)
        if not parsed_url.scheme or not parsed_url.netloc:
            raise ValueError('URL non valido')
        return v

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
