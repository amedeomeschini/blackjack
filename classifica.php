<?php 

    require_once("php/costruisciClassifica.php");
    
?>


<!DOCTYPE html>
<html lang="it">
    <head>
        <title>BlackJack - Classifica</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/ranking.css">
    </head>
    <body>
        <header>
            <p id="indietro"><a href="tavolo.php">INDIETRO</a></p>
        </header>
        <p id="titolo">Classifica</p>
        <div id="tabella">
            <table>
                <tr>
                    <td style="font-weight: bold;">POSIZIONE</td>
                    <td style="font-weight: bold;">GIOCATORE</td>
                    <td style="font-weight: bold;">PUNTI</td>
                </tr>

                <?php echo $_SESSION["righe_tabella"];?>
            </table>
        </div>
    </body>
</html>