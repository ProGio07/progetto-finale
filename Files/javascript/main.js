// Funzione per creare un nuovo prodotto (NFT)
async function product() {
    // Recupera i dati dall'localStorage
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    
    // Recupera i valori dai campi del form
    const name = document.getElementById("name").value;
    const descrizione = document.getElementById("descrizione").value;
    const url_immagine = document.getElementById("url_immagine").value;
    const prezzo = document.getElementById("prezzo").value;

    // Validazione dei campi del form
    const errors = [];

    // Validazione del nome
    if (name.trim() === "") {
        errors.push("Inserire il nome");
        document.getElementById("name-error").textContent = "Inserire il nome";
    } else if (name.length > 255) {
        errors.push("Nome troppo lungo");
        document.getElementById("name-error").textContent = "Nome troppo lungo";
    } else {
        document.getElementById("name-error").textContent = ""; // Cancella il messaggio di errore se il campo è valido
    }

    // Validazione della descrizione
    if (descrizione.trim() === "") {
        errors.push("Inserire la descrizione");
        document.getElementById("descrizione-error").textContent = "Inserire la descrizione";
    } else if (descrizione.length > 255) {
        errors.push("Descrizione troppo lunga");
        document.getElementById("descrizione-error").textContent = "Descrizione troppo lunga";
    } else {
        document.getElementById("descrizione-error").textContent = ""; // Cancella il messaggio di errore se il campo è valido
    }

    // Validazione dell'URL dell'immagine
    if (!isValidImageUrl(url_immagine)) {
        errors.push("URL non valido");
        document.getElementById("url-immagine-error").textContent = "URL non valido";
    } else {
        document.getElementById("url-immagine-error").textContent = ""; // Cancella il messaggio di errore se il campo è valido
    }

    // Validazione del prezzo
    if (isNaN(prezzo) || prezzo <= 0) {
        errors.push("Prezzo non valido");
        document.getElementById("prezzo-error").textContent = "Prezzo non valido";
    } else {
        document.getElementById("prezzo-error").textContent = ""; // Cancella il messaggio di errore se il campo è valido
    }

    // Se ci sono errori, non procedere con la creazione del prodotto
    if (errors.length > 0) {
        return;
    }

    // Invia la richiesta al server per creare il nuovo prodotto
    const request = await fetch("http://127.0.0.1:8000/newproduct", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: name,
            username: username,
            password: password,
            descrizione: descrizione,
            url_immagine: url_immagine,
            prezzo: prezzo
        })
    });

    const response = await request.json();
    console.log(response);

    // Se il prodotto è stato creato con successo, aggiungi le informazioni alla pagina
    if (response.msg === "Newproduct") {
        const productContainer = document.getElementById("products");
        const newProductHTML = `
            <div class="product">
                <div class="product-image">
                    <p>${username}</p>
                    <a href="buy.html">
                        <img src="${url_immagine}" alt="${name}">
                    </a>
                </div>
                <div class="product-details">
                    <div class="product-title">
                        <p>${name}</p>
                    </div>
                    <div class="product-description">
                        <p>${descrizione}</p>
                    </div>
                    <div class="product-price">
                        <p>${prezzo} €</p>
                    </div>
                </div>
            </div>
            <hr class="custom-hr">
        `;
        productContainer.insertAdjacentHTML('beforeend', newProductHTML);
        location.reload(); // Ricarica la pagina per mostrare il nuovo prodotto
    }
}

// Funzione per visualizzare i prodotti esistenti
async function viewProducts() {
    const request = await fetch("http://127.0.0.1:8000/products");
    const response = await request.json();
    console.log(response);

    // Mostra i prodotti sulla pagina
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = ""; // Pulisce il contenitore prima di aggiungere nuovi elementi

    response.forEach(product => {
        const newProductHTML = `
            <div class="product">
                <div class="product-image">
                    <p>${product.username}</p>
                    <a href="buy.html">
                        <img src="${product.url_immagine}" alt="${product.nome}">
                    </a>
                </div>
                <div class="product-details">
                    <div class="product-title">
                        <p>${product.nome}</p>
                    </div>
                    <div class="product-description">
                        <p>${product.descrizione}</p>
                    </div>
                    <div class="product-price">
                        <p>${product.prezzo} €</p>
                    </div>
                </div>
            </div>
            <hr>
        `;
        productContainer.insertAdjacentHTML('beforeend', newProductHTML);
    });
}

// Funzione per verificare se l'utente è loggato
async function checkLoginAndRedirect() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
        window.location.href = "login.html";
    } else {
        const request = await fetch("http://127.0.0.1:8000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const response = await request.json();
        if (response.msg !== "Logged") {
            window.location.href = "login.html";
        }
    }
}

// Funzione per effettuare il logout
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "login.html";
}

// Event listener per cancellare messaggi di errore quando i campi del form vengono svuotati
document.getElementById("name").addEventListener("input", function () {
    document.getElementById("name-error").textContent = "";
});
document.getElementById("descrizione").addEventListener("input", function () {
    document.getElementById("descrizione-error").textContent = "";
});
document.getElementById("url_immagine").addEventListener("input", function () {
    document.getElementById("url-immagine-error").textContent = "";
});
document.getElementById("prezzo").addEventListener("input", function () {
    document.getElementById("prezzo-error").textContent = "";
});

// Funzione per validare un URL di immagine
function isValidImageUrl(url) {
    // Regex per verificare se l'URL termina con un'estensione di file immagine comune
    const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
    return imageExtensions.test(url);
}

// Al caricamento della pagina, verifica il login e visualizza i prodotti
window.onload = async function () {
    await checkLoginAndRedirect();
    await viewProducts();
};
