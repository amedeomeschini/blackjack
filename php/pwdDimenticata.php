<?php

require_once("config.php");

$username = $_POST["username"];
$email = $_POST["email"];
$domanda = $_POST["domanda"];
$risposta = $_POST["risposta"];

if($_SERVER["REQUEST_METHOD"] == "POST"){

    // validazione credenziali
    $check = true;
    if($username == null || $email == null || $domanda == null || $risposta == null)
        $check = false;
    if(!preg_match("/^(.+)@([^\.].*)\.([a-z]{2,})$/",$email))
        $check = false;
    
    
    if($check == true){

        $sql = "SELECT * FROM Utenti WHERE username = ?";
        if($statement = mysqli_prepare($connessione,$sql)){

            mysqli_stmt_bind_param($statement,"s",$username);
            mysqli_stmt_execute($statement);
            $result = mysqli_stmt_get_result($statement);

            if(mysqli_num_rows($result) == 0){
                echo false;
            }else{
                $row = mysqli_fetch_assoc($result);
                if($row["email"] == $email && $row["domanda"] == $domanda && $row["risposta"] == $risposta)
                    echo true;
                else
                    echo false;
            }

        }else{
            die(mysqli_connect_error());
        }
    }
}

mysqli_close($connessione);