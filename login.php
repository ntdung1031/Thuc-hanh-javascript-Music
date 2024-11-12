<?php
// Kết nối đến cơ sở dữ liệu
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "listsong";

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
} 
// Kiểm tra nếu có dữ liệu được gửi từ form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['signInEmail'];
    $password = $_POST['signInpsw'];

    // Câu lệnh SQL để tìm kiếm người dùng theo email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Kiểm tra nếu người dùng tồn tại
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Kiểm tra mật khẩu
        if (password_verify($password, $user['password'])) {
            echo "Đăng nhập thành công!";
            // Lưu thông tin người dùng vào session
            session_start();
            $_SESSION['user_id'] = $user['id']; // Lưu ID người dùng vào session
            $_SESSION['username'] = $user['username']; // Lưu tên người dùng vào session

            // Chuyển hướng đến trang chính
            header("Location: index.php");
            exit();
        } else {
            echo "Mật khẩu không chính xác.";
        }
    } else {
        echo "Không tìm thấy người dùng với email này.";
    }

    // Đóng kết nối
    $stmt->close();
}
$conn->close();

?>
<?php
session_start();
header('Content-Type: application/json'); // Đảm bảo trả về JSON
echo json_encode($_SESSION);
?>

