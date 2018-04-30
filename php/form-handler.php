<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <?php
    $name = $_POST['name'];
    foreach ($name as $item){
        if($item['fio']!='') {
            echo $item['fio'];
            if (count($item) == 1) {
                echo "-обычный билет<br>";
            } elseif (count($item) > 1) {
                echo "-быстрый билет<br>";
            }
        }
    }
    ?>
</body>
</html>


