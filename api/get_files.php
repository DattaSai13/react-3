<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
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

    // Get user_id from query parameter
    $user_id = $_GET['user_id'] ?? '';

    if (empty($user_id)) {
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }

    // Fetch files
    $stmt = $pdo->prepare("SELECT id, file_name, file_type, file_path, uploaded_at FROM user_files WHERE user_id = ? ORDER BY uploaded_at DESC");
    $stmt->execute([$user_id]);
    $files = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Adjust file paths for client access
    foreach ($files as &$file) {
        $file['file_path'] = '/react-31/api/' . $file['file_path'];
    }

    echo json_encode(['success' => true, 'files' => $files]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>