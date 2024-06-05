<?php

if (!isset($_SESSION['userId'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$userId = $_SESSION['userId']; // Assuming user ID is stored in session

try {
    $stmt = $pdo->prepare("SELECT * FROM books WHERE user_id = ?");
    $stmt->execute([$userId]);
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($books);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
