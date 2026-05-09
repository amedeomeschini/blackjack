<?php

require_once("config.php");

$sql = "SELECT * FROM Punti ORDER BY punti DESC";
$result = mysqli_query($connessione,$sql);

$conta = 1;
$_SESSION["righe_tabella"] = "";

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $_SESSION["righe_tabella"] = $_SESSION["righe_tabella"] .
            "<tr id='p-" . $conta ."'>
                <td>" . $conta . "</td>
                <td>" . $row["username"] . "</td>
                <td>" . $row["punti"] . "</td>
            </tr>";

        $conta++;
    }
}

mysqli_close($connessione);