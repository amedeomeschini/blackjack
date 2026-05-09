<?php
    session_start();

    if(!isset($_SESSION["loggato"]) || $_SESSION["loggato"] !== true){
        header("location: index.html");
        exit;
    }

    require_once("php/ottieniPunti.php");
?>

<!DOCTYPE html>
<html lang="it">

    <head>
        <title>BlackJack</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/tavolo.css">
        <script src="js/tavolo.js"></script>
    </head>

    <body id="body" onload="inizializza()">
         
        <header>

            <div id="benvenuto">
                <p style="font-size: 15pt; color: white;"><?php echo "Ciao " . $_SESSION["username"] . "!"?>&nbsp&nbsp</p>
                <p id="punteggio" style="font-size: 15pt; color: white;"><?php echo "I tuoi punti: " . $_SESSION["punti"]?></p>
            </div>

            <div id="bottoni_header">
                <p id="bottone_ranking"><a href="classifica.php">VEDI RANKING</a></p>
                <button id="ricarica" onclick="window.location.href = 'ricaricaPunti.php';">RICARICA</button>
                <button id="logout" onclick="window.location.href = 'php/logout.php';"><img src="img/log_out.png" alt="Logout"></button>
            </div>

        </header>

        <div>
            
            <div id="titolo">
                <div class="top">
                    <div id="top_1">
                        <p id="timer"></p>
                    </div>
                    <div id="top_2">
                        <button id="avvia_ora" onclick="avviaOra()" hidden>AVVIA ORA</button>
                    </div>
                </div>
                <div class="top">
                    <p id="blackjack">BlackJack</p>
                </div>
                <div class="top"></div>
            </div>

            <div>
                <div><p id="tot_0"></p></div>
                <div id="mano_banco"></div>
            </div>

            <div id="spazio"></div>

            <div>
                <div><p id="tot_1"></p></div>
                <div id="mano_giocatore"></div>
            </div>

            <div id="sezione_puntate"></div>

        </div>
    </body>
</html>