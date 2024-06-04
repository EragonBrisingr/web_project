<?php


    $email = $_POST['email'];
    $password = $_POST['newpassword'];

    session_start();
    ini_set('session.gc_maxlifetime', 1800);
    session_set_cookie_params(1800);

    $conn = new mysqli('localhost', 'root', '', 'project');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }

    $sqlSearch = "Select * from login
                where email = '$email'";

    $result = mysqli_query($conn, $sqlSearch);

    

    if(mysqli_num_rows($result) == 1){
        $sql = "Update login
                set password = '$password'
                where email = '$email'";

        if(mysqli_query($conn,$sql) === TRUE){
            echo "<script>alert('Password Reset Successful!'); window.location.href = 'login.html';</script>";
        }
        else{
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    else{
        echo "<script>alert('Email not found!'); window.location.href = 'forgotpass.html';</script>";
    }

    $conn->close();
?>
