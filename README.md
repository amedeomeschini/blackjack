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

* `pwdDimenticata.html`
  * `manuale.html`
  * `index.html`
  * `registrazione.html`
  * `EsportaDB.sh`
  * `README.md`
  * `tavolo.php`
  * `classifica.php`
  * `ricaricaPunti.php`
  * `css/`:
    * `pwdDimenticata.css`
    * `ranking.css`
    * `login.css`
    * `manuale.css`
    * `registrazione.css`
    * `tavolo.css`
    * `ricaricaPunti.css`
  * `js/`:
    * `pwdDimenticata.js`
    * `tavolo.js`
    * `ricaricaPunti.js`
    * `validazione.js`
  * `php/`:
    * `login.php`
    * `register.php`
    * `logout.php`
    * `pwdDimenticata.php`
    * `config.php`
    * `costruisciClassifica.php`
    * `aggiornaPunteggio.php`
    * `cambiaPwd.php`
    * `ottieniPunti.php`
  * `img/`:
    * `sfondoRicarica.png`
    * `login.jpg`
    * `sfondoBlackJack.png`
    * `shown.png`
    * `sfondoTavolo.jpg`
    * `log_out.png`
    * `hidden.png`
    * `sfondoRecupero.png`
    * `sfondoManuale.png`
    * `carte/`:
      * `9-P.png`
      * `9-F.png`
      * `9-Q.png`
      * `jack-C.png`
      * `donna-Q.png`
      * `donna-F.png`
      * `donna-P.png`
      * `jack-F.png`
      * `jack-Q.png`
      * `donna-C.png`
      * `jack-P.png`
      * `retro.png`
      * `9-C.png`
      * `re-Q.png`
      * `re-F.png`
      * `10-C.png`
      * `re-P.png`
      * `8-P.png`
      * `8-F.png`
      * `8-Q.png`
      * `8-C.png`
      * `re-C.png`
      * `10-P.png`
      * `10-F.png`
      * `10-Q.png`
      * `2-F.png`
      * `2-Q.png`
      * `2-P.png`
      * `6-C.png`
      * `4-C.png`
      * `4-Q.png`
      * `4-F.png`
      * `4-P.png`
      * `6-P.png`
      * `2-C.png`
      * `6-F.png`
      * `6-Q.png`
      * `1-P.png`
      * `5-C.png`
      * `1-Q.png`
      * `1-F.png`
      * `3-F.png`
      * `3-Q.png`
      * `7-C.png`
      * `3-P.png`
      * `3-C.png`
      * `7-P.png`
      * `7-F.png`
      * `7-Q.png`
      * `5-Q.png`
      * `5-F.png`
      * `5-P.png`
      * `1-C.png`
    * `memory/`:
      * `x.png`
      * `4.png`
      * `5.png`
      * `6.png`
      * `2.png`
      * `3.png`
      * `1.png`
      * `0.png`
    * `chip/`:
      * `chip_10.png`
      * `annulla.png`
      * `all_in.png`
      * `chip_50.png`
      * `chip_1000.png`
      * `chip_100.png`
      * `chip_500.png`
  * `sql/`:
    * `meschini_635172.sql`

---

## 🔧 Configurazione

1. Clonare il repository nella directory del server locale (es. `htdocs` per XAMPP o `www` per WAMP).
2. Importare il database tramite l'interfaccia dedicata (es. phpMyAdmin).
3. Configurare le credenziali di connessione nel file PHP dedicato.

### Account di Prova (Università)
* **Username:** Utente
* **Password:** Password1