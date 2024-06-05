<?php

session_start();
header('Content-Type: application/json');


echo "<script> getBook();</script>";


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $bookData = json_decode(file_get_contents('php://input'), true);

//     // Assuming you have a function that handles the saving to a database
//     $result = saveBookToDatabase($bookData);

//     if ($result) {
//         echo json_encode(['success' => true, 'message' => 'Book saved successfully']);
//     } else {
//         echo json_encode(['success' => false, 'message' => 'Failed to save book']);
//     }
// } else {
//     echo json_encode(['success' => false, 'message' => 'Invalid request']);
// }
function saveBookToDatabase($bookData) {
    $host = 'localhost';  
    $db = 'web_db'; 
    $user = 'root';
    $password = '';  
    $charset = 'utf8mb4';

    // Set up the DSN (Data Source Name)
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        // Create a new PDO instance
        $pdo = new PDO($dsn, $user, $password, $options);

        // SQL query to insert a new book
        $sql = "INSERT INTO books (book_id, title) VALUES (:book_id, :title) ON DUPLICATE KEY UPDATE title = VALUES(title)";
        $stmt = $pdo->prepare($sql);

        // Bind the values from $bookData to the placeholders in the SQL statement
        $stmt->bindValue(':book_id', $bookData['bookId'], PDO::PARAM_STR);
        $stmt->bindValue(':title', $bookData['title'], PDO::PARAM_STR);

        // Execute the statement
        $stmt->execute();

        // Check if the insert was successful
        if ($stmt->rowCount()) {
            return true;  // Insert or update was successful
        } else {
            return false;  // No rows were affected
        }
    } catch (PDOException $e) {
        // Handle any errors
        error_log('Database error: ' . $e->getMessage());  // Log error to error log
        return false;
    }
}

?>