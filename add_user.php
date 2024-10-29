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
    $name = $_POST['nameSignUp'];
    $email = $_POST['signUpEmail'];
    $password = $_POST['pswSignUp'];

    // Kiểm tra xem tên người dùng đã tồn tại
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $name, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Nếu tên hoặc email đã tồn tại
        $errors = [];
        while ($row = $result->fetch_assoc()) {
            if ($row['username'] === $name) {
                $errors[] = "Tên người dùng đã tồn tại.";
            }
            if ($row['email'] === $email) {
                $errors[] = "Email đã tồn tại.";
            }
        }
        echo implode("<br>", $errors); // Hiển thị lỗi
    } else {
        // Mã hóa mật khẩu
        $password_hashed = password_hash($password, PASSWORD_BCRYPT);

        // Câu lệnh SQL để thêm người dùng
        $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";

        // Chuẩn bị và liên kết
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $password_hashed, $email);

        // Thực hiện câu lệnh
        if ($stmt->execute()) {
            echo "Người dùng đã được thêm thành công.";
        } else {
            echo "Lỗi: " . $sql . "<br>" . $conn->error;
        }
    }

    // Đóng kết nối
    $stmt->close();
}
$conn->close();
?>
