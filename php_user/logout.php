<?php
session_start();        // Khởi tạo session
session_unset();        // Xóa tất cả các biến trong session
session_destroy();      // Hủy session hoàn toàn

header("Location: http://localhost:3000/index.php"); // Chuyển hướng người dùng về trang đăng nhập
exit();
?>