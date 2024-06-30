// Login

async function log() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const usernameErrorMessage = document.getElementById(
    "username-error-message"
  );

  const request = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },

    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const response = await request.json();
  console.log(response);
  if (response.msg === "Logged") {
    window.location.href = "main.html";
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  } else {
    usernameErrorMessage.textContent = "Username e/o password errati";
  }
}

// Check if logged

async function checkCredentialsAndRedirect() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  if (username && password) {
    const request = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const response = await request.json();
    if (response.msg === "Logged") {
      window.location.href = "main.html";
    }
  }
}

function checkLoginFields() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;
  const loginButton = document.getElementById("login-button");

  // Verifica se entrambi i campi sono compilati
  if (usernameValue.trim() !== "" && passwordValue.trim() !== "") {
    // Abilita il pulsante di login
    loginButton.disabled = false;
  } else {
    // Disabilita il pulsante di login se uno o entrambi i campi sono vuoti
    loginButton.disabled = true;
  }
}

function clearErrorMessage() {
  const usernameErrorMessage = document.getElementById(
    "username-error-message"
  );
  usernameErrorMessage.textContent = ""; // Cancella il testo del messaggio di errore
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

window.onload = function () {
  checkCredentialsAndRedirect();
  const loginButton = document.getElementById("login-button");
  loginButton.disabled = true;

  // Aggiungi event listeners agli input dell'username e della password
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  usernameInput.addEventListener("input", clearErrorMessage);
  passwordInput.addEventListener("input", clearErrorMessage);

  // Aggiungi event listeners per controllare il form
  usernameInput.addEventListener("input", checkLoginFields);
  passwordInput.addEventListener("input", checkLoginFields);
};
