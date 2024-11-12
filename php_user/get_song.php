<?php
header("Content-Type: application/json");

// Kết nối đến cơ sở dữ liệu
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "listsong";

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Truy vấn lấy danh sách bài hát
$sql = "SELECT name, singer, path, image, user_id FROM songs";
$result = $conn->query($sql);

$songs = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $songs[] = [
            "name" => $row["name"],
            "singer" => $row["singer"],
            "path" => $row["path"],
            "image" => $row["image"],
            "user_id" => $row["user_id"]
        ];
    }
}

// Trả về JSON
echo json_encode(["songs" => $songs]);

$conn->close();
?>
