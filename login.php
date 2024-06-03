<?php
    $email = $_POST['email'];
    $password = $_POST['password'];

    $conn = new mysqli('localhost', 'root', '', 'project');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }

    $sqlSearch = "Select * from login
                where email = '$email' and password = '$password'";
    
    $result = mysqli_query($conn, $sqlSearch);

    if(mysqli_num_rows($result) == 1){
        echo "Login Successful";
        
        echo "var params = new URLSearchParams();
        params.append('username', $username);

        var url = new URL('index.html');
        location.href = url";
    }
    else{
        echo "<script>alert('Login Failed'); window.location.href = 'login.html';</script>";
    }

    mysqli_close($conn);
?>