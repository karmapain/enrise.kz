<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Путь к файлу autoload.php библиотеки PHPMailer

// Инициализация PHPMailer
$mail = new PHPMailer(true);

try {
    // Настройка сервера
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your_email@gmail.com'; // Ваш адрес Gmail
    $mail->Password   = 'your_password'; // Ваш пароль от почты
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Настройка отправителя и получателя
    $mail->setFrom('your_email@gmail.com', 'Your Name'); // Ваш адрес Gmail и ваше имя
    $mail->addAddress('recipient_email@example.com', 'Recipient Name'); // Адрес получателя и его имя

    // Добавление вложений (если необходимо)
    // $mail->addAttachment('/path/to/file.pdf');

    // Установка темы письма и его тела
    $mail->isHTML(true);
    $mail->Subject = 'Subject of the Email';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';

    // Отправка письма
    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
