<?php
    // Подключение к базе данных
    session_start();

    if ((isset($_GET['logout'])) && ($_GET['logout'] == 1)) {
        setcookie('user_login', '', time() - 36000);
        setcookie('auth_time', '', time() - 36000);
        setcookie('limit_time', '', time() - 36000);
        if (isset($_COOKIE['admin'])) {
            setcookie('admin', '', time() - 36000);
        }
    }
    setcookie('page', 'search.php', time() + 1800);

    if (!isset($_COOKIE['first_connect'])) {
        // Устанавливаем куки first_connect со значением true
        setcookie('first_connect', 'true', time() + 86400, '/'); // Куки будет жить 24 часа (86400 секунд)
        echo '
        <div class="body">
            <div class="notification">
                <span>Данный сайт находится в разработке. Просим уведомить о всех замеченых ошибках и неисправностях.<br>Нажмите ОК для перехода в сайт</span><br>
                <button class="btn-ok" onclick="acceptCookies()">OK</button>
            </div>
        </div>
        ';
    }else{
        header("Location: search.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Срочник 2.0</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="/src/site.ico" type="image/x-icon">
    <style>
        .notification {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            margin: 10px auto;
        }

        .btn-ok {
            background-color: #4caf50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body class='body'>

<script>
    function acceptCookies() {
        // Redirect to search.php
        window.location.href = 'search.php';
    }
</script>

</body>
</html>
