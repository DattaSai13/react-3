<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

$host = 'localhost';
$dbname = 'company_portal';
$username = 'root';
$password = ''; // Update if you set a MySQL password

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $data = json_decode(file_get_contents('php://input'), true);

  if (!isset($data['user_id']) || !isset($data['file_data']) || !isset($data['file_name']) || !isset($data['file_type'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
  }

  $user_id = filter_var($data['user_id'], FILTER_VALIDATE_INT);
  $file_name = filter_var($data['file_name'], FILTER_SANITIZE_STRING);
  $file_type = $data['file_type'];
  $file_data = $data['file_data'];

  if (!in_array($file_type, ['image', 'video', 'pdf'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid file type']);
    exit;
  }

  $timestamp = time();
  $file_path = "Uploads/{$timestamp}_{$file_name}";
  $full_path = __DIR__ . '/' . $file_path;

  if (file_put_contents($full_path, base64_decode($file_data))) {
    $stmt = $pdo->prepare("
      INSERT INTO user_files (user_id, file_name, file_type, file_path, uploaded_at)
      VALUES (:user_id, :file_name, :file_type, :file_path, NOW())
    ");
    $stmt->execute([
      'user_id' => $user_id,
      'file_name' => $file_name,
      'file_type' => $file_type,
      'file_path' => $file_path,
    ]);

    echo json_encode(['success' => true, 'message' => 'File uploaded successfully']);
  } else {
    echo json_encode(['success' => false, 'message' => 'Failed to save file']);
  }
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>