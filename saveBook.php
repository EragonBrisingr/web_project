
<?php

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userID'];
$bookId = $data['bookId'];
$googleBooksUrl = $data['googleBooksUrl'];

try {
    $stmt = $pdo->prepare("INSERT INTO books (user_id, google_books_url) VALUES (?, ?)");
    $stmt->execute([$userId, $googleBooksUrl]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>