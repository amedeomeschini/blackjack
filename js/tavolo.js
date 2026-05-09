let mazzo = [];
let vettoreGiocatori;   // 0: banco, 1: utente
let interval;           // timer iniziale
let interval2;          // scritta blackjack che lampeggia
let secondi;            // secondi del timer
let contaCarte;         // posizione nel mazzo
let strobo;             // alterna i colori dello lampeggio "BlackJack"


class Giocatore{
    constructor(){
        this.puntata = 0;
        this.mano = [];
        this.risultato = 0;
    }

    // CALCOLA IL VALORE DELLE CARTE DEL GIOCATORE
    calcolaRisultati(){
        // inizializza il risultato
        this.risultato = 0;

        // contiene i valori numerici delle carte
        let valori = [];

        // riempie il vettore "valori" in base alle carte della mano in ordine decrescente
        for(let j=0 ; j<this.mano.length ; j++){
            let carta = this.mano[j].split("-")[0];
            if(carta == "jack" || carta == "donna" || carta == "re")
                carta = 10;
            else
                carta = eval(carta);
    
            valori.push(carta);
        }

        valori.sort((a, b) => (a < b) ? 1 : (a > b) ? -1 : 0);
    
        // calcola i risultati
        for(let j=0 ; j<valori.length ; j++){
            if(valori[j] === 1 && this.risultato + 11 < 22 && j === valori.length - 1)
                this.risultato += 11;
            else
                this.risultato += valori[j];
        }    
    }


    // SCRIVE A SCHERMO IL TOTALE DEL GIOCATORE
    scriviTotale(x){
        const img = document.getElementById("b-1");
        if(x == 0 && img.firstChild.getAttribute("src") == "img/carte/retro.png"){
            return;
        }
            
        const p = document.getElementById("tot_"+ x);

        if(this.risultato == "21")
            p.innerText = "BLACKJACK";
        else
            p.innerText = "Tot: " + this.risultato;
    }
}


// INIZIALIZZA IL TAVOLO E RESETTA LE VARIABILI
function inizializza(){
    mazzo = ["1-F","2-F","3-F","4-F","5-F","6-F","7-F","8-F","9-F","10-F","jack-F","donna-F","re-F",
             "1-C","2-C","3-C","4-C","5-C","6-C","7-C","8-C","9-C","10-C","jack-C","donna-C","re-C",
             "1-P","2-P","3-P","4-P","5-P","6-P","7-P","8-P","9-P","10-P","jack-P","donna-P","re-P",
             "1-Q","2-Q","3-Q","4-Q","5-Q","6-Q","7-Q","8-Q","9-Q","10-Q","jack-Q","donna-Q","re-Q"];
    secondi = 30;
    contaCarte = 0;
    strobo = 0;
    vettoreGiocatori = [];
    clearInterval(interval2);

    const body = document.getElementById("body");
    body.setAttribute("style","background-image: url('img/sfondoTavolo.jpg');");

    const blackjack = document.getElementById("blackjack");
    blackjack.style.color = "white";

    // pulizia mano banco
    const pBanco = document.getElementById("tot_0");
    pBanco.innerHTML = "&nbsp";

    const manoBanco = document.getElementById("mano_banco");
    while(manoBanco.firstChild)
        manoBanco.removeChild(manoBanco.firstChild);

    for(let i=1 ; i<=2 ; i++){
        const div = document.createElement("div");
        div.id = "b-" + i;
        div.setAttribute("class","carta");
        manoBanco.appendChild(div);
    }

    // pulizia mano giocatore
    const pGiocatore = document.getElementById("tot_1");
    pGiocatore.innerHTML = "&nbsp";

    const manoGiocatore = document.getElementById("mano_giocatore");
    while(manoGiocatore.firstChild)
        manoGiocatore.removeChild(manoGiocatore.firstChild);

    for(let i=1 ; i<=2 ; i++){
        const div = document.createElement("div");
        div.id = "g-" + i;
        div.setAttribute("class","carta");
        manoGiocatore.appendChild(div);
    }

    // inserimento tasto GIOCA
    const puntate = document.getElementById("sezione_puntate");
    while(puntate.firstChild)
        puntate.removeChild(puntate.firstChild);

    const gioca = document.createElement("button");
    gioca.setAttribute("onclick","abilitaMano()");
    gioca.setAttribute("class","pulsanti");
    gioca.id = "gioca";
    gioca.innerText = "GIOCA";

    // disabilita GIOCA se non ho credito
    const p = document.getElementById("punteggio");
    const punteggio = p.innerText;
    if(punteggio.split(" ")[3] == 0){
        gioca.setAttribute("hidden","hidden");
      
        const body = document.getElementById("body");
        const messaggio = document.createElement("p");
        messaggio.setAttribute("class","messaggio");
        messaggio.innerText = "Ricarica il tuo credito!";
        body.appendChild(messaggio);
    }

    puntate.appendChild(gioca);
}


// AVVIA LE PUNTATE E IL TIMER
function abilitaMano(){

    timer();
    interval = setInterval(timer,1000);

    // inizializza i giocatori
    const g1 = new Giocatore();
    const g2 = new Giocatore();
    vettoreGiocatori.push(g1);
    vettoreGiocatori.push(g2);

    // rimuove il pulsante "Gioca"
    const gioca = document.getElementById("gioca");
    gioca.parentNode.removeChild(gioca);

    // costruisce layout per le puntate
    const div = document.getElementById("sezione_puntate");
    const tabella = document.createElement("table");

    for(let i=0 ; i<2 ; i++){ // i: giocatori
        const tr = document.createElement("tr");
        
        switch(i){

            case 0:
                const td = document.createElement("td");
                td.id = "info_puntata";
                td.setAttribute("colspan","7");
                td.innerText = "Puntata: 0";
                tr.appendChild(td);
                break;

            case 1:
                for(let j=0 ; j<7 ; j++){ // j: chips e tasti
                    tr.id = "chips";
                    const td = document.createElement("td");
                    td.setAttribute("class","chip");

                    const img = document.createElement("img");
                    img.setAttribute("style","max-width: 100%; max-height: 100%;");
                    img.id = "chip-" + j;

                    switch(j){
                        case 0:
                            img.setAttribute("src","img/chip/annulla.png");
                            img.setAttribute("alt","Annulla puntata");
                            img.style.filter = "brightness(50%)";
                            break; 
                        case 1:
                            img.setAttribute("src","img/chip/chip_10.png");
                            img.setAttribute("alt","10");
                            img.setAttribute("onclick","punta(10)");
                            break;
                        case 2:
                            img.setAttribute("src","img/chip/chip_50.png");
                            img.setAttribute("alt","50");
                            img.setAttribute("onclick","punta(50)");
                            break;
                        case 3:
                            img.setAttribute("src","img/chip/chip_100.png");
                            img.setAttribute("alt","100");
                            img.setAttribute("onclick","punta(100)");
                            break;
                        case 4:
                            img.setAttribute("src","img/chip/chip_500.png");
                            img.setAttribute("alt","500");
                            img.setAttribute("onclick","punta(500)");
                            break;
                        case 5:
                            img.setAttribute("src","img/chip/chip_1000.png");
                            img.setAttribute("alt","1000");
                            img.setAttribute("onclick","punta(1000)");
                            break;
                        case 6:
                            img.setAttribute("src","img/chip/all_in.png");
                            img.setAttribute("alt","All-In");
                            img.setAttribute("onclick","allIn()");
                            td.setAttribute("style","filter: drop-shadow(0px 0px 10px rgba(255, 215, 0, 0.7));");
                            break;
                    }
                    td.appendChild(img);
                    tr.appendChild(td);
                }
        }
        tabella.appendChild(tr);
        div.appendChild(tabella);
    }
}


// DISATTIVA LE ALTRE CHIPS E FA ALL-IN
function allIn(){
    const p = document.getElementById("punteggio");
    const n = eval(p.innerText.split(" ")[3]);

    for(let i=1 ; i<7 ; i++){
        const img = document.getElementById("chip-" + i);
        img.style.filter = "brightness(50%)";
        img.removeAttribute("onclick");
    }

    punta(n);
}


// TIMER DI 30s PRIMA DELL'INIZIO DELLA PARTITA
function timer(){
    if(secondi == 0){

        // se puntata == 0 viene stampato un avviso e riavviato il timer
        if(vettoreGiocatori[1].puntata == 0){

            const body = document.getElementById("body");
            const p = document.createElement("p");
            p.innerText = "Effettua una puntata!";
            p.setAttribute("class","messaggio");
            body.appendChild(p);

            setTimeout(() => {
                body.removeChild(p);
            }, 3000);

            clearInterval(interval);
            const p2 = document.getElementById("timer");
            p2.innerText = "";

            inizializza();
            return;
        }

        // ferma e rimuove il timer
        clearInterval(interval);
        const p = document.getElementById("timer");
        p.innerText = "";

        // rimuove il bottone "AVVIA ORA"
        const avvia_ora = document.getElementById("avvia_ora");
        avvia_ora.setAttribute("hidden","hidden");

        // avvia il gioco
        gioca();
        return;
    }

    // decrementa il timer
    const p = document.getElementById("timer");
    p.innerText = secondi;
    secondi--;
}


// AZZERA IL TIMER E AVVIA LA PARTITA
function avviaOra(){
    clearInterval(interval);

    const p = document.getElementById("timer");
    p.innerText = "";

    const avvia_ora = document.getElementById("avvia_ora");
    avvia_ora.setAttribute("hidden","hidden");

    gioca();
}


// AVVIA LA PARTITA FINO A PULSANTI "CARTA"/"STAI"
function gioca(){
    disabilitaPuntate();
    mischiaMazzo();
    distribuisciCarte();

    for(let i=0 ; i<vettoreGiocatori.length ; i++){
        vettoreGiocatori[i].calcolaRisultati();
        vettoreGiocatori[i].scriviTotale(i);
    }

    abilitaPulsanti();

    // controlla se l'utente ha fatto blackjack con le prime 2 carte
    if(vettoreGiocatori[1].risultato == 21){
        blackJack(); 
        stai();
    }  
}  


// MISCHIA IL MAZZO
function mischiaMazzo() {
    for (let i = mazzo.length - 1; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = mazzo[i];
      mazzo[i] = mazzo[j];
      mazzo[j] = temp;
    }
}


// ABILITA PULSANTI "CARTA", "STAI" E "x2"
function abilitaPulsanti(){
    const div = document.getElementById("sezione_puntate")
    const tabella = document.createElement("table");
    tabella.id = "tabella_bottoni_giocate";
    const tr = document.createElement("tr");

    for(let i=0 ; i<3 ; i++){
        const td = document.createElement("td");
        const bottone = document.createElement("button");

        // verifica se si rientra nei parametri del "raddoppia"
        if(i == 2 && !(vettoreGiocatori[1].risultato >=9 && vettoreGiocatori[1].risultato <=11))
            continue;

        switch(i){
            case 0:
                bottone.innerText = "CARTA";
                bottone.setAttribute("onclick","carta()");
                bottone.setAttribute("class","bottoni_giocate");
                bottone.id = "bottone_carta";
                break;
            case 1:
                bottone.innerText = "STAI";
                bottone.setAttribute("onclick","stai()");
                bottone.setAttribute("class","bottoni_giocate");
                bottone.id = "bottone_stai";
                break;
            case 2:
                const p = document.getElementById("punteggio");
                const punteggio = p.innerText;
                if(punteggio.split(" ")[3] >= vettoreGiocatori[1].puntata){
                    bottone.innerText = "x2";
                    bottone.setAttribute("onclick","raddoppia()");
                    bottone.setAttribute("class","bottoni_giocate");
                    bottone.id = "bottone_raddoppia";
                }else{
                    continue;
                }
                break;
        }
        td.appendChild(bottone);
        tr.appendChild(td);
    }
    tabella.appendChild(tr);
    div.appendChild(tabella);
}


// AGGIORNA LA PUNTATA E DIMINUISCE I PUNTI NEL DATABASE
function punta(x) {
    if(x == "raddoppia"){
        
        x = vettoreGiocatori[1].puntata;
        vettoreGiocatori[1].puntata *= 2;
        aggiornaPunteggio(x, "riduci");

    }else{

        const pPunteggio = document.getElementById("punteggio");
        const punteggio = eval(pPunteggio.innerText.split(" ")[3]);

        if(x > punteggio){ // se non ho abbastanza credito compare un messaggio

            const p = document.createElement("p");
            p.innerText = "Credito insufficiente!";
            p.setAttribute("class","messaggio");
            const body = document.getElementById("body");
            body.appendChild(p);

            setTimeout(() => {
                const body = document.getElementById("body");
                body.removeChild(p);
            }, 3000);

        }else{

            // attiva bottone "AVVIA SUBITO" e disattiva chip "ALL-IN"
            const avvia_ora = document.getElementById("avvia_ora");
            avvia_ora.removeAttribute("hidden");
            const allIn = document.getElementById("chip-6");
            allIn.removeAttribute("onclick");
            allIn.style.filter = 'brightness(50%)';
            
            // attiva bottone "ANNULLA PUNTATA"
            const bottone_annulla = document.getElementById("chip-0");
            if(x != "annulla" && bottone_annulla != null){
                bottone_annulla.setAttribute("onclick","annullaPuntata()");
                bottone_annulla.style.filter = "brightness(100%)";
            }

            // riduce il punteggio nel database
            vettoreGiocatori[1].puntata += x;
            const td = document.getElementById("info_puntata");
            td.innerText = "Puntata: " + vettoreGiocatori[1].puntata;
            aggiornaPunteggio(x, "riduci");

        }
    }
}


// ANNULLA LA PUNTATA QUANDO SI CLICCA IL PULSANTE "X"
function annullaPuntata(){
    const p = document.getElementById("punteggio");
    aggiornaPunteggio(vettoreGiocatori[1].puntata,"aumenta");

    for(let i=1 ; i<7 ; i++){
        const img = document.getElementById("chip-" + i);
        img.style.filter = "brightness(100%)";
        if(img.getAttribute("onclick") == null){
            switch(i){
                case 1:
                    img.setAttribute("onclick","punta(10)");
                    break;
                case 2:
                    img.setAttribute("onclick","punta(50)");
                    break;
                case 3:
                    img.setAttribute("onclick","punta(100)");
                    break;
                case 4:
                    img.setAttribute("onclick","punta(500)");
                    break;
                case 5:
                    img.setAttribute("onclick","punta(1000)");
                    break;
                case 6:
                    img.setAttribute("onclick","allIn()");
                    break;
            }
        }

    }

    vettoreGiocatori[1].puntata = 0;

    const info_puntata = document.getElementById("info_puntata");
    info_puntata.innerText = "Puntata: 0";

    const bottone_annulla = document.getElementById("chip-0");
    bottone_annulla.removeAttribute("onclick");
    bottone_annulla.style.filter = "brightness(50%)";

    const avvia_ora = document.getElementById("avvia_ora");
    avvia_ora.setAttribute("hidden","hidden");
}


// RIMUOVE LE CHIPS
function disabilitaPuntate(){
    const tr = document.getElementById("chips");
    if(tr == null)
        return;
    tr.parentNode.removeChild(tr);

    const td = document.getElementById("info_puntata");
    td.removeAttribute("colspan");
}


// DISTRIBUISCE LE PRIME DUE CARTE AL BANCO E AL GIOCATORE
function distribuisciCarte(){
    for(let i=0 ; i<4 ; i++){
        const img = document.createElement("img");
        img.setAttribute("style","max-width: 100%; max-height: 100%;");
        let div;

        switch(i){
            case 0:
                vettoreGiocatori[0].mano.push(mazzo[contaCarte]);
                div = document.getElementById("b-1");
                img.setAttribute("src","img/carte/retro.png");
                img.setAttribute("alt","?");
                div.appendChild(img);
                break;
            case 1:
                vettoreGiocatori[0].mano.push(mazzo[contaCarte]);
                div = document.getElementById("b-2");
                img.setAttribute("src","img/carte/" + mazzo[contaCarte] + ".png");
                img.setAttribute("alt",mazzo[contaCarte]);
                div.appendChild(img);
                break;
            case 2:
                vettoreGiocatori[1].mano.push(mazzo[contaCarte]);
                div = document.getElementById("g-1");
                img.setAttribute("src","img/carte/" + mazzo[contaCarte] + ".png");
                img.setAttribute("alt",mazzo[contaCarte]);
                div.appendChild(img);
                break;
            case 3:
                vettoreGiocatori[1].mano.push(mazzo[contaCarte]);
                div = document.getElementById("g-2");
                img.setAttribute("src","img/carte/" + mazzo[contaCarte] + ".png");
                img.setAttribute("alt",mazzo[contaCarte]);
                div.appendChild(img);
                break;
        }
        contaCarte++;
    }
}


// LO SFONDO DIVENTA ORO, LE PUNTATE SI FERMANO, LA SCRITTA LAMPEGGIA
function blackJack(){
    const body = document.getElementById("body");
    body.setAttribute("style","background-image: url('img/sfondoBlackJack.png');");
    
    interval2 = setInterval(() => {
        const p = document.getElementById("blackjack");
        if(strobo%2 == 0)
            p.style.color = "gold";
        else
            p.style.color = "black";
        strobo++;
    },300);
}


// DA UNA CARTA IN PIU' AL GIOCATORE
function carta(){

    // assegna carta e la fa comparire sul banco
    vettoreGiocatori[1].mano.push(mazzo[contaCarte]);

    const div = document.getElementById("mano_giocatore");
    const nuovaCarta = document.createElement("div");
    nuovaCarta.setAttribute("class","carta");

    const img = document.createElement("img");
    img.setAttribute("style","max-width: 100%; max-height: 100%;");
    img.setAttribute("src","img/carte/" + mazzo[contaCarte] + ".png");
    img.setAttribute("alt",mazzo[contaCarte]);

    nuovaCarta.appendChild(img);
    div.appendChild(nuovaCarta);
    contaCarte++;

    // ricalcola il totale della mano
    vettoreGiocatori[1].calcolaRisultati();
    vettoreGiocatori[1].scriviTotale(1);

    // se si chiede carta il bottone x2 va via
    const x2 = document.getElementById("bottone_raddoppia");
    if(x2 != null)
        x2.parentNode.removeChild(x2);

    // controlla che non si sia sforato e se si è fatto blackjack
    if(vettoreGiocatori[1].risultato >= 21){
        if(vettoreGiocatori[1].risultato > 21){
            stai();
        }
        else{
            blackJack();
            stai();
        }  
    }
}


// DISABILITA CARTA/STAI E FA GIOCARE IL BANCO
function stai(){
    const tabella = document.getElementById("tabella_bottoni_giocate");
    if(tabella != null)
        while(tabella.firstChild)
            tabella.removeChild(tabella.firstChild);

    giocataBanco();
}


// RADDOPPIA LA PUNTATA E CHIEDE UNA SOLA CARTA
function raddoppia(){
    punta("raddoppia");
    const td = document.getElementById("info_puntata");
    td.innerText = "Puntata: " + vettoreGiocatori[1].puntata;

    carta();
    if(vettoreGiocatori[1].risultato != 21)
        stai();
}


// TURNO DEL BANCO
function giocataBanco(){

    if(vettoreGiocatori[1].risultato > 21){ // se il giocatore ha sforato il banco non gioca
        calcoloVincite();
        return;
    }

    let conta = 0;

    let interval3 = setInterval(() => {     

        // scopre la prima carta, e mostra il totale del banco
        if(conta == 0){
            const div = document.getElementById("b-1");
            const img = div.firstChild;
            img.id = "retro";
            
            img.style.animation = 'girare 0.5s ease';
            img.style.transformStyle = 'preserve-3d';

            setTimeout(function() {
                img.setAttribute("src","img/carte/" + mazzo[0] + ".png");
                img.setAttribute("alt",mazzo[0]);
                vettoreGiocatori[0].scriviTotale(0);
            }, 100);

            conta++;
            return;
        }

        if(vettoreGiocatori[0].risultato < 17 && vettoreGiocatori[0].risultato <= vettoreGiocatori[1].risultato){

            const div = document.getElementById("mano_banco");
            const nuovaCarta = document.createElement("div");
            nuovaCarta.setAttribute("class","carta");

            const img = document.createElement("img");
            img.setAttribute("style","max-width: 100%; max-height: 100%;");
            img.setAttribute("src","img/carte/" + mazzo[contaCarte] + ".png");
            img.setAttribute("alt",mazzo[contaCarte]);

            vettoreGiocatori[0].mano.push(mazzo[contaCarte]);
            contaCarte++;
            
            nuovaCarta.appendChild(img);
            div.appendChild(nuovaCarta);

            vettoreGiocatori[0].calcolaRisultati();
            vettoreGiocatori[0].scriviTotale(0);

        } else {
            clearInterval(interval3);
            calcoloVincite();     
        }

    },1000);
}


// CALCOLA LE VINCITE DEL GIOCATORE
function calcoloVincite(){
    const p = document.getElementById("info_puntata");
    p.innerText = "";

    const body = document.getElementById("body");
    const messaggio = document.createElement("p");

    if(vettoreGiocatori[1].risultato > 21 || (vettoreGiocatori[1].risultato < vettoreGiocatori[0].risultato && vettoreGiocatori[0].risultato <22)){
        vettoreGiocatori[1].puntata = 0;
        messaggio.setAttribute("class","perdita");
        messaggio.innerText = "Hai perso!";

    }else if(vettoreGiocatori[1].risultato == vettoreGiocatori[0].risultato && vettoreGiocatori[0].risultato < 22) {
        aggiornaPunteggio(vettoreGiocatori[1].puntata,"aumenta");
        messaggio.setAttribute("class","pareggio");
        messaggio.innerText = "Pareggio";

    }else if(vettoreGiocatori[1].risultato <= 21 && (vettoreGiocatori[0].risultato > 21 || vettoreGiocatori[1].risultato > vettoreGiocatori[0].risultato)){
        if(vettoreGiocatori[1].risultato == 21){
            vettoreGiocatori[1].puntata *= 2.5;
        }else{
            vettoreGiocatori[1].puntata *= 2;
        }
        
        aggiornaPunteggio(vettoreGiocatori[1].puntata,"aumenta");
        messaggio.setAttribute("class","vittoria");
        messaggio.innerText = "Hai vinto!";
    }

    body.appendChild(messaggio);

    // dopo aver rivelato l'esito inizializza il banco per una nuova partita
    setTimeout(() => {
        const body = document.getElementById("body");
        body.removeChild(messaggio);
        inizializza();
    }, 3000);
}


// AGGIORNA IL PUNTEGGIO NEL SERVER
function aggiornaPunteggio(x,modifica){ // x: punti, modifica: operazione da eseguire (aumenta/riduci)
    const params = "operazione=" + x + "-" + modifica;

    fetch("php/aggiornaPunteggio.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    })
    .then(response => response.text())
    .then(text => {
        const p = document.getElementById("punteggio");
        p.innerText = "I tuoi punti: " + text;
    })
    .catch(error => {
        console.error("Si è verificato un errore:", error.message);
    });
}