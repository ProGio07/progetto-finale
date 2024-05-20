// Register

async function reg() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const request = await fetch("http://127.0.0.1:8000/register", {
        method: 'POST',
        headers: {
            'content-Type' : 'application/json'
        },

        body: JSON.stringify({
            username: username,
            password : password
        })
    })
    const response = await request.json()
    console.log(response)
    if(response.msg === "Utente inserito con successo")
        window.location.href = "templates/login.html";
}

// Check if logged

async function checkCredentialsAndRedirect() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    
    if (username && password) {
        const request = await fetch("http://127.0.0.1:8000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const response = await request.json();
        
        if (response.msg === "Logged") {
            window.location.href = "templates/main.html";
        }
    }
}

window.onload = checkCredentialsAndRedirect;