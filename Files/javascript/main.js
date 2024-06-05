// New Product

async function product() {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    const name = document.getElementById("name").value
    const descrizione = document.getElementById("descrizione").value
    const url_immagine = document.getElementById("url_immagine").value
    const prezzo = document.getElementById("prezzo").value
    const request = await fetch("http://127.0.0.1:8000/newproduct",{
        method: 'POST',
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: name,
            username: username,
            password: password,
            descrizione: descrizione,
            url_immagine: url_immagine,
            prezzo: prezzo
        })
    })
    const response = await request.json()
    console.log(response)
    if(response.msg === "Newproduct"){
        const productContainer = document.getElementById("products");
        const newProductHTML = `
        <div>
            <p>${username}</p>
        </div>
        <div>
            <p>${name}</p>
        </div>
        <a href="buy.html">
            <img src="${url_immagine}">
        </a>
        <div>
            <p>${prezzo}</p>
        </div>            
        <div>
            <p>${descrizione}</p>
        </div>
        `;
        productContainer.insertAdjacentHTML('beforeend', newProductHTML);
        location.reload();
    }
}


// View Products

async function viewProducts() {
    const request = await fetch("http://127.0.0.1:8000/products");
    const response = await request.json();
    console.log(response)
    document.getElementById("products").innerHTML = ""
    for(let i=0 ; i < response.length; i++){
        const productContainer = document.getElementById("products");
        const newProductHTML = `
            <div>
                <p>${response[i].username}</p>
            </div>
            <div>
                <p>${response[i].nome}</p>
            </div>
            <a href="buy.html">
                <img src="${response[i].url_immagine}">
            </a>
            <div>
                <p>${response[i].prezzo}</p>
            </div>            
            <div>
                <p>${response[i].descrizione}</p>
            </div>
            <hr>
        `;
        productContainer.insertAdjacentHTML('beforeend', newProductHTML);
    }
}

window.onload = viewProducts();

// Check if the user have an account

async function checkLoginAndRedirect() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (!username || !password) {
        window.location.href = "login.html";
    }
    else{
        const request = await fetch("http://127.0.0.1:8000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const response = await request.json();
        if (response.msg != "Logged") {
            window.location.href = "login.html";
        }
    }
}

window.onload = checkLoginAndRedirect();

// Logout

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "login.html";
}