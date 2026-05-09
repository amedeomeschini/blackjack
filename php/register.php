<?php

require_once("config.php");

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];
$password2 = $_POST["password2"];
$domanda = $_POST["domanda"];
$risposta = $_POST["risposta"];


if($_SERVER["REQUEST_METHOD"] == "POST"){

    // validazione credenziali
    $check = true;
    if($username == null || $email == null || $password == null || $domanda == null || $risposta == null)
        $check = false;
    if(!preg_match("/^(.+)@([^\.].*)\.([a-z]{2,})$/",$email))
        $check = false;
    if($password != $password2)
        $check = false;
    if(!preg_match("/^(?=.*[0-9])(?=.*[A-Z]).{8,}$/",$password))
        $check = false;


    if($check == true){

        // verifica che non esista già un utente con quel nome
        $sql = "SELECT * FROM Utenti WHERE username = ?";
        if($statement = mysqli_prepare($connessione,$sql)){

            mysqli_stmt_bind_param($statement,"s",$username);
            mysqli_stmt_execute($statement);
            $result = mysqli_stmt_get_result($statement);

            if(mysqli_num_rows($result) != 0){
                echo "Nome utente già in uso!";
                mysqli_close($connessione);
                exit;
            }

        }else{
            die(mysqli_connect_error());
        }

        // verifica che non esista già un utente con quell'email
        $sql = "SELECT * FROM Utenti WHERE email = ?";
        if($statement = mysqli_prepare($connessione,$sql)){

            mysqli_stmt_bind_param($statement,"s",$email);
            mysqli_stmt_execute($statement);
            $result = mysqli_stmt_get_result($statement);

            if(mysqli_num_rows($result) != 0){
                echo "Indirizzo email già in uso!";
                mysqli_close($connessione);
                exit;
            }

        }else{
            mysqli_close($connessione);
            die(mysqli_connect_error());
        }

        
        // inserisce l'utente nel database
        mysqli_begin_transaction($connessione);

        $sql = "INSERT INTO Utenti(username,email,password,domanda,risposta) VALUES (?,?,?,?,?)";
        if($statement = mysqli_prepare($connessione,$sql)){
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            mysqli_stmt_bind_param($statement,"sssss",$username,$email,$hashed_password,$domanda,$risposta);
            mysqli_stmt_execute($statement);

            $sql = "INSERT INTO Punti(username,punti) VALUES (?,1000)";
            if($statement = mysqli_prepare($connessione,$sql)){

                mysqli_stmt_bind_param($statement,"s",$username);
                mysqli_stmt_execute($statement);
                mysqli_commit($connessione);

                session_start();
                $_SESSION["loggato"] = true;
                $_SESSION["username"] = $username;
                echo true;

            }else{
                mysqli_rollback($connessione);
                mysqli_close($connessione);
                die(mysqli_connect_error());
            }

        }else{
            mysqli_rollback($connessione);
            mysqli_close($connessione);
            die(mysqli_connect_error());
        }
    }

}

mysqli_close($connessione);