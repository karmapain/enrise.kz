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


    $body = "<h1>Письмо с сайта. Оставлена заявка пользователем :&nbsp;" . $name . "</h1>\n
    ФИО:&nbsp;" . $name . "\n
    Номер телефона:&nbsp;" . $phone . "\n
    Почта:&nbsp;" . $email . "\n
    Сопроводительный текст:&nbsp;" . $message;

    /*$attachments = [
        __DIR__ . '/images/4.jpg',
        __DIR__ . '/images/5.jpg',
    ];*/

    //var_dump(send_mail($settings['mail_settings_prod'], ['sultanalikhan61@gmail.com', 'alimdosmatov@gmail.com'], 'Письмо с сайта', $body, $attachments));

    var_dump(send_mail($settings['mail_settings_prod'], ['sultanalikhan61@gmail.com', 'alimdosmatov@gmail.com'], 'Письмо с сайта', $body));
}


?>

