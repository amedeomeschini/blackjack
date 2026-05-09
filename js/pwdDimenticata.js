// AGGIUNGE UN L'EVENT LISTENER PER IL CONTROLLO DELL'UTENTE AL FORM
function inizializza(){
    const form = document.getElementById("form");
    form.addEventListener("submit",controllaUtente);
}


// VERIFICA CHE I DATI INSERITI SIANO CORRETTI
function controllaUtente(event){
    event.preventDefault();
    let username = document.getElementsByName("username")[0].value;

    if(validaRipristino()){
        const credenziali = new FormData(form);

        fetch("php/pwdDimenticata.php",{
            method: "POST",
            body: credenziali
        })
        .then(response => {
            if(!response.ok)
                throw new Error();
            return response.text();
        })
        .then(text => {
            if(text == true){
                ripristinaPwd(username);
                return;
            }
            const p = document.getElementById("messaggio");
            p.innerText = "Uno o più campi errati!";
        })
        .catch(error => {
            const p = document.getElementById("messaggio");
            p.innerText = "Impossibile connettersi al server :/";
        });
    }    
}


// RICOSTRUISCE IL FORM PER CONSENTIRE LA MODIFICA DELLA PASSWORD
function ripristinaPwd(username){
    const form = document.getElementById("form");
    form.removeEventListener("submit",controllaUtente);

    // svuota il form
    while(form.firstChild)
        form.removeChild(form.firstChild);
    
    // inserisce nuovi input per cambiare la password
    const divEsterno = document.createElement("div");
    divEsterno.id = "sezione_password";
    for(let i=1 ; i<3 ; i++){
        const divEsterno = document.createElement("div");
        divEsterno.id = "sezione_password" + i;
        
        const divInterno = document.createElement("div");
        const img = document.createElement("img");
        img.id = "tipoInput" + i;
        img.setAttribute("alt","Mostra/nascondi password");
        img.setAttribute("src","img/hidden.png");

        const input = document.createElement("input");

        switch(i){
            case 1:
                input.setAttribute("type","password");
                input.setAttribute("name","nuovaPassword");
                input.setAttribute("placeholder","Nuova password");
                break;

            case 2:
                input.setAttribute("type","password");
                input.setAttribute("name","nuovaPassword2");
                input.setAttribute("placeholder","Conferma password");
                break;
        }

        divInterno.appendChild(img);
        divEsterno.appendChild(input);
        divEsterno.appendChild(divInterno);
        form.appendChild(divEsterno);
    }

    attivaMostraNasconiPwd();
    
    const nota = document.createElement("p");
    nota.innerText = "La password deve essere lunga almeno 8 caratteri e contenere almeno un numero e una lettera maiuscola.";
    nota.id = "nota";
    form.appendChild(nota);

    // inserisce un hr
    const hr = document.createElement("hr");
    form.appendChild(hr);
    
    // inserisce il bottone "cambia password"
    const button = document.createElement("button");
    button.setAttribute("type","submit");
    button.innerText = "CAMBIA PASSWORD";
    form.appendChild(button);

    // inserisce la casella del messaggio
    const p = document.createElement("p");
    p.id = "messaggio";
    p.innerHTML = "&nbsp";
    form.appendChild(p);

    // aggiunge un nuovo event listener al form per cambiare la password
    form.addEventListener("submit",(event) => {
        event.preventDefault();

        if(validaNuovaPwd()){
            const credenziali = new FormData(form);
            credenziali.append("username", username);

            fetch("php/cambiaPwd.php",{
                method: "POST",
                body: credenziali
            })
            .then(response => {
                if(!response.ok)
                    throw new Error();
                return response.text();
            })
            .then(text => {
                const p = document.getElementById("messaggio");
                p.innerText = text;

                // se la password viene cambiata con successo si torna al login
                if(text == "Password cambiata."){
                    let timeout = setTimeout(() => {
                        window.location.href = "index.html";
                    },2000);
                }
            })
            .catch(error => {
                const p = document.getElementById("messaggio");
                p.innerText = "Impossibile connettersi al server :/";
            });
        }
    });
}


// INSERISCE GLI EVENT LISTENER SULL'IMMAGINE "MOSTRA/NASCONI PASSWORD"
function attivaMostraNasconiPwd(){
    const img1 = document.getElementById("tipoInput1");
    img1.addEventListener("click",(event) => {
        
        const input = document.getElementsByName("nuovaPassword")[0];

        if(input.type == "password"){
            input.type = "text";
            img1.setAttribute("src","img/shown.png");
        } else {
            input.type = "password";
            img1.setAttribute("src","img/hidden.png");
        }
        event.preventDefault();
        
    });

    const img2 = document.getElementById("tipoInput2");
    img2.addEventListener("click",(event) => {
        
        const input = document.getElementsByName("nuovaPassword2")[0];

        if(input.type == "password"){
            input.type = "text";
            img2.setAttribute("src","img/shown.png");
        } else {
            input.type = "password";
            img2.setAttribute("src","img/hidden.png");
        }
        event.preventDefault();
        
    });
}