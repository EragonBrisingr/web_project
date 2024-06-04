<?php

    $email = $_POST['email'];
    $password = $_POST['password'];
    

    session_start();
    ini_set('session.gc_maxlifetime', 1800);
    session_set_cookie_params(1800);
    
    $conn = new mysqli('localhost', 'root', '', 'project');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }

    $sqlSearch = "Select * from login
                where email = '$email' and password = '$password'";
    
    $result = mysqli_query($conn, $sqlSearch);

    $row = $result->fetch_assoc();
    $username = $row['username'];  // Correctly fetching the username from the result set
    $userId = $row['userID'];  // Correctly fetching the user id from the result set

    if(mysqli_num_rows($result) == 1){
        $_SESSION['username']=$username;
        $_SESSION['email']=$email;
        $_SESSION['userId']=$userId;
        echo "<script>alert('Welcome, $username!'); window.location.href = 'index.php';</script>";
    }
    else{
        echo "<script>alert('Login Failed!'); window.location.href = 'login.html';</script>";
    }

    mysqli_close($conn);
?>