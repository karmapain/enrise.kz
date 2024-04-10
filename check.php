<?php
require 'phpmailer/PHPMailerAutoload.php'; // Путь к файлу autoload.php библиотеки PHPMailer

// Инициализация PHPMailer
$mail = new PHPMailer;


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = trim($_POST['fullname']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);

    try {
        // Настройка сервера
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'alimdosmatov@gmail.com'; // Ваш адрес Gmail
        $mail->Password   = 'pro100Alim4ik228'; // Ваш пароль от почты
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 587;

        // Настройка отправителя и получателя
        $mail->setFrom('alimdosmatov@gmail.com'); // Ваш адрес Gmail и ваше имя
        $mail->addAddress('sultanalikhan61@gmail.com'); // Адрес получателя и его имя

        // Добавление вложений (если необходимо)
        // $mail->addAttachment('/path/to/file.pdf');

        // Установка темы письма и его тела
        $mail->isHTML(true);
        $mail->Subject = 'Заявка с сайта';
        $mail->Body    = 'Отправка зявки с сайта <b>enrise.kz</b>. Сообщение от ' . $fullname;

        // Отправка письма
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
