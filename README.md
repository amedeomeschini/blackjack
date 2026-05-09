# BlackJack Web Game - Progetto di Progettazione Web

Repository relativo al progetto per l'esame di **Progettazione Web**, corso di laurea triennale in **Ingegneria Informatica** presso l'Università di Pisa (A.A. 2023/24).

Il progetto consiste in una Web App interattiva per il gioco del BlackJack, completa di sistema di autenticazione, gestione della persistenza dei dati e minigiochi per il recupero del credito virtuale.

## 🚀 Funzionalità Principali

### 🃏 Logica di Gioco (BlackJack)
* **Regole Standard:** Implementazione completa delle regole del BlackJack (valore dell'Asso dinamico 1/11, figure pari a 10).
* **IA del Banco:** Algoritmo deterministico che gestisce le pescate del banco (stai a 17 o vince se supera il giocatore).
* **Moltiplicatori:** Vincita standard (2x), BlackJack (2.5x) e restituzione in caso di "push" (pareggio).
* **Raddoppio (x2):** Possibilità di raddoppiare la puntata iniziale se il punteggio delle prime due carte è compreso tra 9 e 11.

### 🔐 Auth & User Management
* **Validazione:** Controllo robusto lato client (regex) per email e password (min. 8 caratteri, una maiuscola e un numero).
* **Recupero Password:** Sistema basato su domanda e risposta di sicurezza memorizzate nel DB.
* **Persistenza:** Salvataggio del punteggio e delle credenziali tramite database MySQL.

### 🎮 Mini-game "Memory"
* Sezione **RICARICA** dedicata al recupero punti tramite un gioco di memoria.
* Sistema di vincite scalabile in base al numero di coppie individuate entro il tempo limite.

---

## 🛠 Stack Tecnologico

Il progetto segue l'architettura classica delle applicazioni web dinamiche:

* **Frontend:** * HTML5 e CSS3 per l'interfaccia responsive e le animazioni delle carte.
    * JavaScript (ES6+) per la manipolazione del DOM, gestione dei timer e logica di gioco.
* **Backend:** * PHP per la logica di business, gestione delle sessioni utente e interfacciamento al DB.
    * MySQL per la base di dati relazionale.
* **Comunicazione Client-Server:** * Utilizzo massivo di **Fetch API** per aggiornamenti asincroni del punteggio e login senza ricaricamento della pagina (Single Page Experience nelle sezioni critiche).

---

## 📂 Struttura del Progetto

* `index.html`: Entry point (pagina di login).
* `tavolo.php`: Interfaccia principale del tavolo da gioco.
* `js/`: 
    * `tavolo.js`: Core engine del gioco (distribuzione, turni, calcolo risultati).
    * `validazione.js`: Validazione form di input.
    * `ricaricaPunti.js`: Logica del minigioco Memory.
* `php/`: Script per l'integrazione con il database e la gestione sessioni.
* `manuale.html`: Documentazione utente e regole del gioco.

---

## 🔧 Configurazione

1. Clonare il repository nella directory del server locale (es. `htdocs` per XAMPP o `www` per WAMP).
2. Importare il database tramite l'interfaccia dedicata (es. phpMyAdmin).
3. Configurare le credenziali di connessione nel file PHP dedicato.

### Account di Prova (Università)
* **Username:** Utente
* **Password:** Password1