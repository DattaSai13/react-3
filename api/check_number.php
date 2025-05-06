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
    $unique_number = $data['unique_number'] ?? '';

    if (empty($unique_number)) {
        echo json_encode(['success' => false, 'message' => 'Unique number is required']);
        exit;
    }

    // Check if unique_number exists
    $stmt = $pdo->prepare("SELECT id, unique_number, created_at FROM users WHERE unique_number = ?");
    $stmt->execute([$unique_number]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // User exists
        echo json_encode([
            'success' => true,
            'exists' => true,
            'user_id' => $user['id'],
            'unique_number' => $user['unique_number'],
            'created_at' => $user['created_at']
        ]);
    } else {
        // Register new user
        $stmt = $pdo->prepare("INSERT INTO users (unique_number, created_at) VALUES (?, NOW())");
        $stmt->execute([$unique_number]);
        $user_id = $pdo->lastInsertId();

        echo json_encode([
            'success' => true,
            'exists' => false,
            'user_id' => $user_id,
            'unique_number' => $unique_number,
            'created_at' => date('Y-m-d H:i:s')
        ]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>