<?php
require_once __DIR__ . '/vendor/autoload.php';
$settings = require_once __DIR__ . '/settings.php';
require_once __DIR__ . '/functions.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Получаем данные из POST-запроса
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $name = $_POST['name'];
    $message = $_POST['message'];

    if(!empty($message)){
        $body = "<h1>Письмо с сайта. Оставлена заявка пользователем :&nbsp;" . $name . "</h1><p>\n
        ФИО:&nbsp;" . $name .
        "\nНомер телефона:&nbsp;" . $phone .
        "\nПочта:&nbsp;" . $email .
        "\nСопроводительный текст:&nbsp;" . $message . "</p>";
    }else{
        $body = "<h1>Письмо с сайта. Оставлена заявка пользователем :&nbsp;" . $name . "</h1><p>\n
        ФИО:&nbsp;" . $name .
        "\nНомер телефона:&nbsp;" . $phone .
        "\nПочта:&nbsp;" . $email . "</p>";
    }

    if(send_mail($settings['mail_settings_prod'], ['sultanalikhan61@gmail.com', 'alimdosmatov@gmail.com'], 'Письмо с сайта', $body)){
        // Если отправка успешна, выводим JavaScript с alert и перенаправлением
        echo '<script>alert("Письмо успешно отправлено"); window.location.href = "index.html";</script>';
    }else{
        // Если отправка не удалась, выводим JavaScript с alert и перенаправлением
        echo '<script>alert("Ошибка при отправке письма"); window.location.href = "index.html";</script>';
    }
}
?>
