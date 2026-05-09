<?php
    session_start();

    if(!isset($_SESSION["loggato"]) || $_SESSION["loggato"] !== true){
        header("location: index.html");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="it">
    
    <head>
        <title>BlackJack - Ranking</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/ricaricaPunti.css">
        <script src="js/ricaricaPunti.js"></script>
    </head>

    <body onload="inizializza()">

        <header>
            <p id="indietro"><a href="tavolo.php">INDIETRO</a></p>
        </header>

        <div id="titolo">
            <p id="memory"></p>
        </div>

        <div id="main"></div>

        <div id="avvia">
            <p id="timer"></p>
            <button id="bottone_avvia" onclick="avvia()">AVVIA</button>
        </div>
        
    </body>

</html>