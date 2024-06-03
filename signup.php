<?php

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $host = "localhost";
    $db = "project";
    $pwd = "";
    $user = "root";

    $conn = new mysqli($host, $user, $pwd, $db);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }

    $sqlSearch = "Select * from login
                where username = '$username' or email = '$email'";
    $result = mysqli_query($conn, $sqlSearch);

    if(mysqli_num_rows($result) > 0){
        echo "Username or email already exists";
    }
    else{
        $sql = "Insert into login(username, email, password)
                values('$username', '$email', '$password')";
        if($conn->query($sql) === TRUE){
            echo "<script>alert('Signup Successful!'); window.location.href = 'index.html';</script>";
        }
        else{
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    mysqli_close($conn);
?>