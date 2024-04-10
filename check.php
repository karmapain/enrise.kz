<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // Email, на который вы хотите отправить данные
    $to = 'sultanalikhan61@example.com';

    // Тема письма
    $subject = 'New Contact Form Submission';

    // Тело письма
    $message = "Full Name: $fullname\n";
    $message .= "Phone Number: $phone\n";
    $message .= "Email: $email\n";

    // Заголовки письма
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Отправка письма
    if (mail($to, $subject, $message, $headers)) {
        echo 'Your message has been sent successfully!';
    } else {
        echo 'Unable to send email. Please try again later.';
    }
}
?>
