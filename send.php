<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("Доступ запрещён.");
}

$name = trim($_POST["firstname"] ?? "");
$surname = trim($_POST["lastname"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $surname === "" || $message === "") {
    exit("Ошибка: все поля обязательны.");
}

if (mb_strlen($name) > 100 || mb_strlen($surname) > 100 || mb_strlen($message) > 2000) {
    exit("Ошибка: слишком длинный ввод.");
}

$blocked = ["\r", "\n", "Content-Type:", "Bcc:", "Cc:", "To:"];
foreach ($blocked as $item) {
    if (stripos($name, $item) !== false || stripos($surname, $item) !== false) {
        exit("Ошибка: недопустимые символы.");
    }
}

$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$surname = htmlspecialchars($surname, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$to = "asdqwwe70@gmail.com";
$subject = "Новая заявка с сайта BuhOne";

$body = "Имя: $name\n";
$body .= "Фамилия: $surname\n";
$body .= "Сообщение:\n$message\n";

$headers = "From: no-reply@yourdomain.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    header("Location: index.html?success=1");
    exit;
} else {
    exit("Ошибка отправки.");
}
?>