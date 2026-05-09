<?php

require_once("config.php");

$username = $_POST["username"];
$password = $_POST["password"];

if($_SERVER["REQUEST_METHOD"] === "POST"){

    // validazione credenziali
    $check = true;
    if($username == null || $password == null)
        $check = false;

    if($check == true){
 
        $sql = "SELECT * FROM Utenti WHERE username = ?";
        if($statement = mysqli_prepare($connessione,$sql)){

            mysqli_stmt_bind_param($statement,"s",$username);
            mysqli_stmt_execute($statement);
            $result = mysqli_stmt_get_result($statement);

            if(mysqli_num_rows($result) == 1){
                $row = mysqli_fetch_assoc($result);

                if(password_verify($password,$row["password"])){
                    
                    session_start();
                    $_SESSION["loggato"] = true;
                    $_SESSION["username"] = $row["username"];
                    echo true;

                }else{
                    echo "La password non è corretta!";
                }

            }else{
                echo "Non ci sono account con quel nome!";
            }

        }else{
            die(mysqli_connect_error());
        }

    }
}

mysqli_close($connessione);