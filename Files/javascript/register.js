// Register

async function reg() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const usernameErrorMessage = document.getElementById("username-error-message");
    const registerButton = document.getElementById("register-button");

    // Controllo se il pulsante è disabilitato
    if (registerButton.disabled) {
        return; // Non fare nulla se il pulsante non è cliccabile
    }

    const request = await fetch("http://127.0.0.1:8000/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const response = await request.json();
    console.log(response);

    if (response.msg === "Utente inserito con successo") {
        window.location.href = "/templates/login.html";
    } else {
        usernameErrorMessage.textContent = "Username già esistente";
    }
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

// Check username validity

function checkUsernameValidity() {
    const usernameInput = document.getElementById("username");
    const usernameErrorMessage = document.getElementById("username-error-message");
    const usernameValue = usernameInput.value;
    const termsCheckbox = document.getElementById("form2Example3c");
    const registerButton = document.getElementById("register-button");

    if (usernameValue === "") {
        usernameErrorMessage.textContent = ""; // Pulisci il messaggio di errore
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
        return;
    }

    // Verifica se lo username è troppo corto
    if (usernameValue.length < 3) {
        usernameErrorMessage.textContent = "Lo username è troppo corto.";
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
        return;
    }

    // Verifica se lo username è troppo lungo
    if (usernameValue.length > 20) {
        usernameErrorMessage.textContent = "Lo username è troppo lungo.";
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
        return;
    }

    // Verifica se lo username non rispetta il pattern
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (!usernamePattern.test(usernameValue)) {
        usernameErrorMessage.textContent = "Lo username non può contenere caratteri speciali.";
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
        return;
    }

    // Esegue la validazione
    usernameErrorMessage.textContent = "";
    if (!usernameErrorMessage.textContent && !document.getElementById("password-error-message").textContent && termsCheckbox.checked) {
        registerButton.disabled = false; // Abilita il pulsante di registrazione
    }
}

function checkPasswordValidity() {
    const passwordInput = document.getElementById("password");
    const passwordErrorMessage = document.getElementById("password-error-message");
    const passwordValue = passwordInput.value;
    const termsCheckbox = document.getElementById("form2Example3c");
    const registerButton = document.getElementById("register-button");

    if (passwordValue === "") {
        passwordErrorMessage.textContent = ""; // Pulisci il messaggio di errore
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
        return;
    }

    // Verifica se la password è troppo corta
    if (passwordValue.length < 8) {
        passwordErrorMessage.textContent = "La password è troppo corta.";
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
        return;
    }

    // Verifica se la password non rispetta il pattern
    const passwordPattern = /^[a-zA-Z0-9_!#$%&"-.?]*$/;
    if (!passwordPattern.test(passwordValue)) {
        passwordErrorMessage.textContent = "La password non può contenere caratteri speciali.";
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
        return;
    }

    // Esegue la validazione
    passwordErrorMessage.textContent = "";
    if (!document.getElementById("username-error-message").textContent && !passwordErrorMessage.textContent && termsCheckbox.checked) {
        registerButton.disabled = false; // Abilita il pulsante di registrazione
    }
}

function checkTermsValidity() {
    const termsCheckbox = document.getElementById("form2Example3c");
    const registerButton = document.getElementById("register-button");
    const usernameErrorMessage = document.getElementById("username-error-message");
    const passwordErrorMessage = document.getElementById("password-error-message");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (termsCheckbox.checked && !usernameErrorMessage.textContent && !passwordErrorMessage.textContent && usernameInput.value && passwordInput.value) {
        registerButton.disabled = false; // Abilita il pulsante di registrazione
    } else {
        registerButton.disabled = true; // Disabilita il pulsante di registrazione
    }
}


function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("show-password-checkbox");
  
    if (showPasswordCheckbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }


function showPassword() {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("toggle-password-button");
    passwordInput.type = "text";
    toggleButton.innerHTML = '<i class="bi bi-eye"></i>'; // Cambio dell'icona dell'occhio aperto
}

// Funzione per nascondere la password
function hidePassword() {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("toggle-password-button");
    passwordInput.type = "password";
    toggleButton.innerHTML = '<i class="bi bi-eye-slash"></i>'; // Cambio dell'icona dell'occhio chiuso
}



// Disabilita il pulsante di registrazione al caricamento della pagina
window.onload = function() {
    const registerButton = document.getElementById("register-button");
    registerButton.disabled = true;
};
