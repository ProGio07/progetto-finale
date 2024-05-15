from pydantic import BaseModel, Field

class Recensione(BaseModel):
    descrizione: str
    valutazione: int
    prodottoid: int
    utenteid: int


class Prodotto(BaseModel):
    nome: str
    descrizione: str
    prezzo: float
    img: bytes
    recensioni: list[Recensione] = []
    utenteid: int

class User(BaseModel):
    username: str = Field(..., min_length=3)
    password: str