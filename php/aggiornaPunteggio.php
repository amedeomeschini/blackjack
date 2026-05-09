<?php

require_once("config.php");
session_start();

$operazione = explode("-",$_POST["operazione"]);
$operazione_0 = $operazione[0];
$username = $_SESSION["username"];

if($operazione[1] == "riduci")
    $sql = "UPDATE Punti SET punti = punti - ? WHERE username = ?";
else if($operazione[1] == "aumenta")
    $sql = "UPDATE Punti SET punti = punti + ? WHERE username = ?";


if($statement = mysqli_prepare($connessione,$sql)){

    mysqli_stmt_bind_param($statement,"ss",$operazione_0,$username);
    mysqli_stmt_execute($statement);

}else{
    die(mysqli_connect_error());
}

$sql = "SELECT punti FROM punti WHERE username = ?";
if($statement = mysqli_prepare($connessione,$sql)){

    mysqli_stmt_bind_param($statement,"s",$username);
    mysqli_stmt_execute($statement);
    $result = mysqli_stmt_get_result($statement);
    $row = mysqli_fetch_assoc($result);
    echo $row["punti"];
    
}else{
    die(mysqli_connect_error());
}

mysqli_close($connessione);