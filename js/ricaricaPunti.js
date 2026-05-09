let conta;    // secondi del timer
let interval; // intervallo del timer
let figure = [];
let figureScelte = [];
let tdScelti = [];
let coppie = [];


// COSTRUISCE LA TABELLA CON LE FIGURE NASCOSTE E DISTRIBUITE CASUALMENTE
function inizializza(){
    conta = 5;
    figure = [1,1,2,2,3,3,4,4,5,5,6,6];
    figureScelte = [];
    tdScelti = [];
    coppie = [];
    let contaId = 0;

    const p = document.getElementById("memory");
    p.innerText = "Memory";

    const timer = document.getElementById("timer");
    timer.setAttribute("hidden","hidden");

    const bottone = document.getElementById("bottone_avvia");
    bottone.removeAttribute("hidden");


    const div = document.getElementById("main");
    while(div.firstChild)
        div.removeChild(div.firstChild);


    const table = document.createElement("table");

    for(let i=0 ; i<3 ; i++){
        const tr = document.createElement("tr");

        for(let j=0 ; j<4 ; j++){
            const td = document.createElement("td");
            td.id = contaId;
            const img = document.createElement("img");
            img.id = "immagine-" + contaId;
            contaId++;
            img.setAttribute("style","max-width: 100%; max-height: 100%;");
            img.setAttribute("src","img/memory/0.png");
            img.setAttribute("alt","?");

            td.appendChild(img);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    div.appendChild(table);
}


// AVVIA IL TIMER E SCOPRE LE CARTE
function avvia(){
    const bottone = document.getElementById("bottone_avvia");
    bottone.setAttribute("hidden","hidden");

    const timer = document.getElementById("timer");
    timer.removeAttribute("hidden");

    contoAllaRovescia();
    interval = setInterval(contoAllaRovescia, 1000);
    figure.sort(() => Math.random() - 0.5);
    scopriCarte();
}


// DECREMENTA IL TIMER DI 1
function contoAllaRovescia(){
    const p = document.getElementById("timer");
    p.innerText = conta;
    conta--;

    if(conta == -1){
        const p = document.getElementById("timer");
        p.innerText = "";
        clearInterval(interval);
        copriCarte();
    } 
}


// SCOPRE LE CARTE
function scopriCarte(){
    let n = 0;
    for(let i=0 ; i<12 ; i++){
        const img = document.getElementById("immagine-" + i);
        img.setAttribute("src","img/memory/" + figure[n] + ".png");
        img.setAttribute("alt",figure[n]);
        n++;
    }
}


// COPRE LE CARTE
function copriCarte(){
    let n = 0;
    for(let i=0 ; i<12 ; i++){
        const img = document.getElementById("immagine-" + i);
        img.setAttribute("src","img/memory/0.png");
        img.setAttribute("onclick","seleziona(" + i + ")");
        img.setAttribute("alt","?");
        n++;
    } 
}


// GESTISCE LA SELEZIONE DELLE FIGURE
function seleziona(n){
    figureScelte.push(figure[n]);
    tdScelti.push(n);
    const img = document.getElementById("immagine-" + n);
    img.removeAttribute("onclick");
    img.style.filter = "brightness(130%)";
    
    // se le figure scelte sono due controlla se sono uguali o meno
    if(figureScelte.length == 2){
        const img1 = document.getElementById("immagine-" + tdScelti[0]);
        const img2 = document.getElementById("immagine-" + tdScelti[1]);
        img1.style.filter = "none";
        img2.style.filter = "none";

        if(figureScelte[0] == figureScelte[1]){
            coppie.push(true);
            img1.setAttribute("src","img/memory/" + figureScelte[0] + ".png");
            img2.setAttribute("src","img/memory/" + figureScelte[1] + ".png");
        } else {
            coppie.push(false);
            img1.setAttribute("src","img/memory/x.png");
            img2.setAttribute("src","img/memory/x.png");
        }
        figureScelte = [];
        tdScelti = [];

        // se non ci sono più figure da scegliere si calcola la vincita
        if(coppie.length == 6){
            calcoloVincita();
            return;
        }
    }

}


// CALCOLA LA VINCITA IN BASE ALLE COPPIE GIUSTE SELEZIONATE
function calcoloVincita(){
    let vincita;
    coppieGiuste = 0;
    for(let i=0 ; i<6 ; i++){
        if(coppie[i] == true)
            coppieGiuste++;
    }
    
    switch(coppieGiuste){
        case 0:
            const p = document.getElementById("memory");
            p.innerText = "Hai perso!";
            break;
        case 1:
            vincita = 50;
            break;
        case 2:
            vincita = 100;
            break;
        case 3:
            vincita = 300;
            break;
        case 4:
            vincita = 500;
            break;
        case 5:
            vincita = 800;
            break;
        case 6:
            vincita = 1000;
            break;
    }

    // se si è vinto qualcosa allora viene aggiornato il punteggio sul server
    if(coppieGiuste != 0)
        aggiornaPunteggio(vincita,"aumenta");

    // dopo 3 secondi il minigioco viene inizializzato
    let timeout = setTimeout(() => {
        inizializza();
        clearTimeout(timeout);
    },3000);
}


// AGGIORNA IL PUNTEGGIO DELL'UTENTE
function aggiornaPunteggio(x, stringa) {
    let url = "php/aggiornaPunteggio.php";
    let params = "operazione=" + x + "-" + stringa;

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
    })
    .then(response => {
        if (!response.ok) {
            throw new Error();
        }
    })
    .then(() => {
        const p = document.getElementById("memory");
        p.innerText = "Hai vinto " + x + " punti!";
    })
    .catch(error => {
        console.error("Si è verificato un errore:", error.message);
    });
}