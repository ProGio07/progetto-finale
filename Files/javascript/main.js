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
    if(!request.ok) {
        const errorResponse = await request.json()
        const errorType = errorResponse.detail[0].type;
        let errorMessage;
        switch(errorType) {
        case "string_too_short":
            errorMessage = "Lo username deve avere almeno 3 caratteri.";
            break;
        default:
            errorMessage = "Si è verificato un errore durante la registrazione.";
        }
        document.getElementById("response").innerHTML = errorMessage
    } else{
    const response = await request.json()
    document.getElementById("response").innerHTML = response.msg
    }
}