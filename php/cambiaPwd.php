<?php

require_once("config.php");

$username = $_POST["username"];
$password = $_POST["nuovaPassword"];
$password2 = $_POST["nuovaPassword2"];

if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // validazione credenziali
    $check = true;
    if($password == null || $password2 == null)
        $check = false;
    if($password != $password2)
        $check = false;
    if(!preg_match("/^(?=.*[0-9])(?=.*[A-Z]).{8,}$/",$password))
        $check = false;

    // modifica password
    if($check == true){
        $sql = "UPDATE Utenti SET password = ? WHERE username = ?";
        if($statement = mysqli_prepare($connessione,$sql)){

            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            mysqli_stmt_bind_param($statement,"ss",$hashed_password,$username);
            mysqli_stmt_execute($statement);
            mysqli_close($connessione);

            echo "Password cambiata.";

        }else{
            die(mysqli_connect_error());  
        }
    }
}