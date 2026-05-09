// VALIDA LE CREDENZIALI INSERITE PER LA REGISTRAZIONE
function validaRegistrazione(){
    const username = document.getElementsByName("username")[0];
    const email = document.getElementsByName("email")[0];
    const password = document.getElementsByName("password")[0];
    const password2 = document.getElementsByName("password2")[0];
    const domanda = document.getElementsByName("domanda")[0];
    const risposta = document.getElementsByName("risposta")[0];


    // controllo campi vuoti
    if(username.value == "" || email.value == "" || password.value == "" || password2.value == "" || domanda.value == "" || risposta.value == ""){
        const p = document.getElementById("messaggio");
        p.innerText = "Completare tutti i campi!";

        if(username.value == "")
            rosso(username);
        if(email.value == "")
            rosso(email);
        if(password.value == "")
            rosso(password);
        if(password2.value == "")
            rosso(password2);
        if(domanda.value == "")
            rosso(domanda);
        if(risposta.value == "")
            rosso(risposta);

        return false;
    }

    // controllo formato email
    let regex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
    if(!regex.test(email.value)){
        const p = document.getElementById("messaggio");
        p.innerText = "Inserire un indirizzo email valido!";
        rosso(email);
        return false;
    }


    // controllo password uguali
    if(password.value != password2.value){
        const p = document.getElementById("messaggio");
        p.innerText = "Le password non corrispondono!";
        rosso(password);
        rosso(password2);
        return false;
    }


    // controllo formato password
    regex = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
    if(!regex.test(password.value)){
        const p = document.getElementById("messaggio");
        p.innerText = "La password non rispetta il formato indicato!";
        rosso(password);
        rosso(password2);
        return false;
    }

    return true;
}


// VALIDA LE CREDENZIALI INSERITE PER L'ACCESSO
function validaAccesso(){
    const username = document.getElementsByName("username")[0];
    const password = document.getElementsByName("password")[0];

    // controllo campi vuoti
    if(username.value == "" || password.value == ""){
        const p = document.getElementById("messaggio");
        p.innerText = "Completare tutti i campi!";

        if(username.value == "")
            rosso(username);
        if(password.value == "")
            rosso(password);

        return false;
    }
    
    return true;
}


// VALIDA LE CREDENZIALI INSERITE PER IL RIPRISTINO PASSWORD
function validaRipristino(){
    const username = document.getElementsByName("username")[0];
    const email = document.getElementsByName("email")[0];
    const domanda = document.getElementsByName("domanda")[0];
    const risposta = document.getElementsByName("risposta")[0];

    // controllo campi vuoti
    if(username.value == "" || email.value == "" || domanda.value == "" || risposta.value == ""){
        const p = document.getElementById("messaggio");
        p.innerText = "Completare tutti i campi!";

        if(username.value == "")
            rosso(username);
        if(email.value == "")
            rosso(email);
        if(domanda.value == "")
            rosso(domanda);
        if(risposta.value == "")
            rosso(risposta);

        return false;
    }


    // controllo formato email
    let regex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
    if(!regex.test(email.value)){
        const p = document.getElementById("messaggio");
        p.innerText = "Inserire un indirizzo email valido!";
        rosso(email);
        return false;
    }

    return true;
}


// VALIDA LA NUOVA PASSWORD
function validaNuovaPwd(){
    const password = document.getElementsByName("nuovaPassword")[0];
    const password2 = document.getElementsByName("nuovaPassword2")[0];

    // controllo campi vuoti
    if(password.value == "" || password2.value == ""){
        const p = document.getElementById("messaggio");
        p.innerText = "Completare tutti i campi!";

        if(password.value == "")
            rosso(password);
        if(password2.value == "")
            rosso(password2);

        return false;
    }

    // controllo password uguali
    if(password.value != password2.value){
        const p = document.getElementById("messaggio");
        p.innerText = "Le password non corrispondono!";
        rosso(password);
        rosso(password2);
        return false;
    }

    // controllo formato password
    let regex = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
    if(!regex.test(password.value)){
        const p = document.getElementById("messaggio");
        p.innerText = "La password non rispetta il formato indicato!";
        rosso(password);
        rosso(password2);
        return false;
    }
        
    return true;
}


// EVIDENZIA LE CREDENZIALI ERRATE
function rosso(elemento) {
    if(elemento.name == "password" || elemento.name == "password2" || elemento.name == "nuovaPassword" || elemento.name == "nuovaPassword2"){
        elemento.parentNode.style.border = "1pt solid red";
        elemento.addEventListener("blur", () => {
            if (elemento.value != "")
                elemento.parentNode.style.border = "1pt solid black";
            else
                elemento.parentNode.style.border = "1pt solid red";
        });

    } else {
        elemento.style.border = "1pt solid red";
    
        elemento.addEventListener("blur", () => {
            if (elemento.value != "")
                elemento.style.border = "1pt solid black";
            else
                elemento.style.border = "1pt solid red";
        });
    }
}