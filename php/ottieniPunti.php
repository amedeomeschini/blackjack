<?php

require_once("config.php");

$username = $_SESSION["username"];

$sql = "SELECT punti FROM Punti WHERE username = ?";
if($statement = mysqli_prepare($connessione,$sql)){

    mysqli_stmt_bind_param($statement,"s",$username);
    mysqli_stmt_execute($statement);
    $result = mysqli_stmt_get_result($statement);
    $row = mysqli_fetch_assoc($result);
    $_SESSION["punti"] = $row["punti"];

}else{

    mysqli_close($connessione);
    die(mysqli_connect_error());

}

mysqli_close($connessione);