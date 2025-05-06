<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database credentials
$host = 'localhost';
$dbname = 'company_portal';
$username = 'root';
$password = ''; // Update if you set a MySQL password

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    $file_id = $data['file_id'] ?? '';

    if (empty($file_id)) {
        echo json_encode(['success' => false, 'message' => 'File ID is required']);
        exit;
    }

    // Get file path
    $stmt = $pdo->prepare("SELECT file_path FROM user_files WHERE id = ?");
    $stmt->execute([$file_id]);
    $file = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$file) {
        echo json_encode(['success' => false, 'message' => 'File not found']);
        exit;
    }

    // Delete file from storage
    $file_path = __DIR__ . '/' . $file['file_path'];
    if (file_exists($file_path)) {
        unlink($file_path);
    }

    // Delete from database
    $stmt = $pdo->prepare("DELETE FROM user_files WHERE id = ?");
    $stmt->execute([$file_id]);

    echo json_encode(['success' => true, 'message' => 'File deleted successfully']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>