$(document).ready(function() {
    //скрыть все кроме начальной вкладки
    function mainWinLoad(){
        if($(window).width() <= '626'){
            $("#content>div").css({'display':'block'});
        }
        if($(window).width() > '626'){
            $("#content>div").css({'display':'none'});
            $("#tickBlock").css({'display':'block'});
        }

    }
    mainWinLoad();
    $(window).resize(function () {
        mainWinLoad();
    });

    //навигация по вкладкам
    $("#navig ul a").click(function (event) {
        event.preventDefault();
        var lol = $(this).attr('id');
        $("#content>div").css({'display':'none'});
        $("#"+lol+"Block").css({'display':'block'});
    });
    //загрузка цены
    function priceLoad(){
        if($("#fincBlock").css("display")=="block"){
            $.ajax({
                type:'POST',
                url:'php/stock.php',
                success:function(data){
                    $("#price").html(data);
                }
            });
            return false;
        }
    }
    function startPrice() {
        setInterval(function () { priceLoad(); },5000);
    }
    startPrice();

    /////загрузка careers
    function loadCareers() {
        $.ajax({
            type:'POST',
            url:'php/career.php',
            success:function (data) {
                $.each(data, function (key, value) {
                    var colomn = "";
                    if(key % 2 == 0){
                        colomn = "forImgBoxLeft";
                    }else{
                        colomn = "forImgBox";
                    }
                    var block = "<div  class='"+colomn+" select noFilter'><img src='img/"+value['image']+"' alt=\"\"><div class='blockImgName'><h4>"+value['name']+"</h4> <div class=\"line\">\n" +
                        "                            <div class=\"yellow\"></div>\n" +
                        "                            <div class=\"red\"></div>\n" +
                        "                        </div></div></div>";
                    $("#Box").append(block);
                });

            }
        });
        return false;
    }
    loadCareers();

    /////пасхалка
    var countClick = 0;
    var randWDclassic = function(n){  // [ 3 ] random words and digits by the wocabulary
        var s ='', abd ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', aL = abd.length;
        while(s.length < n)
            s += abd[Math.random() * aL|0];
        return s;
    }
    $("#pashalka").click(function () {
        countClick++;
        switch (countClick){
            case 1:  $(".reckt").css({width:'+8px',height:'+8px'});
                $("#tomato").css({top: '-8px',left:'-8px'});
                $("#gold").css({top: '+5px',left:'0'});
                $("#yellowgreen").css({top: '-8px',left:'+5px'});
                $("#olivedrab").css({top: '+5px',left:'-5px'});
                $("#skyblue").css({top: '-7px',left:'0'});
                $("#rebeccapurle").css({top: '0',left:'0'});
                $("#crimson").css({top: '+5px',left:'+3px'}); break;

            case 2: $(".reckt").css({width:'16px',height:'16px'});
                 break;
            case 3:
                var code = randWDclassic(4);
                $(".reckt").css({width:'330px',height:'100px', 'border-radius':'2px', padding:'10px'});
                $("#black").css({background:'white', padding:'10px', opacity:'0.95'});
                $("#pashalka").css({margin:'0 35%'});
                $("#black").html("<h4>Discount Code:"+code+"</h4><p>Awesome! You found a secret discount code in our website.</p>");
                $("#black>h4").css({margin: '10px'});
                localStorage.setItem("code", code);
                break;
        }

    });

    function getCode(){
        var code = localStorage.getItem("code");
        if(code!=null && code!=""){
            $(".reckt").css({width:'+8px',height:'+8px'});
            $("#tomato").css({top: '-8px',left:'-8px'});
            $("#gold").css({top: '+5px',left:'0'});
            $("#yellowgreen").css({top: '-8px',left:'+5px'});
            $("#olivedrab").css({top: '+5px',left:'-5px'});
            $("#skyblue").css({top: '-7px',left:'0'});
            $("#rebeccapurle").css({top: '0',left:'0'});
            $("#crimson").css({top: '+5px',left:'+3px'});
            $(".reckt").css({width:'330px',height:'100px', 'border-radius':'2px', padding:'10px'});
            $("#black").css({background:'white', padding:'10px', opacity:'0.95'});
            $("#pashalka").css({margin:'0 35%'});
            $("#black").html("<h4>Discount Code:"+code+"</h4><p>Awesome! You found a secret discount code in our website.</p>");
            $("#black>h4").css({margin: '10px'});
        }
    }
    getCode();

    //анимация для инфо фотки
    function selectImgName(object) {
        var sel = $(object).children(".blockImgName");
        var line = $(sel).children(".line");
        var red = $(line).children(".red");
        var yellow = $(line).children(".yellow");
        return {
            sel: sel,
            line: line,
            red: red,
            yellow: yellow
        };
    }
    
    $("body").on("mouseover", ".select", function (event) {
        var tmp = selectImgName(this);
        var sel = tmp.sel;
        var line = tmp.line;
        var red = tmp.red;
        var yellow = tmp.yellow;
        $(line).css({visibility:"visible"});
        $(sel).css({opacity:'1'});
        var width = $(sel).width() + 16;
        var startPosition = (-1)*(width*2);
        $(red).css({width: width, left:width});
        $(yellow).css({width: width, left:0});
        $(line).css({width:width*2});
        $(line).css({left: startPosition});
        $(line).animate({left:0}, 500);
    });
    $("body").on("mouseout", ".select", function () {
        var tmp = selectImgName(this);
        var sel = tmp.sel;
        var line = tmp.line;
        var red = tmp.red;
        var yellow = tmp.yellow;
        $(sel).css({opacity:'0.9'});
        var width = $(sel).width() + 16;
        var startPosition = (-1)*(width*2);
        $(line).animate({left:startPosition}, 500);
    });

    function selk(object) {
        var parn =  $(object).parent(".ticket");
        var row = $(parn).parent(".row");
        var child = $(row).children(".img");
        var left = $(child).children(".leftBock");
        var right = $(child).children(".rightBock");
        var font = $(left).children("h3");
        return {
            child: child,
            left: left,
            right: right,
            font: font
        };

    }
    $(".name").keyup(function(){
        var tmp = selk(this);
        var font = tmp.font;
        var content = $(this).val();
        $(font).html(content);
    });
    //изменение билетов
    $("body").on("change", ".ticket input:checkbox", function () {
        var tmp = selk(this);
        var child = tmp.child;
        var left = tmp.left;
        var right = tmp.right;
        var font = tmp.font;
        if(this.checked){
            $(child).css({'background-image': 'url("/img/ticketfpbg.png")'});
            $(left).css({'background-image': 'url("/img/ticketfpleft.png")'});
            $(right).css({'background-image': 'url("/img/ticketfpright.png")', 'width':'190px'});
            $(font).css({color : 'white'});
        }else{
            $(child).css({'background-image': 'url("/img/ticketbg.png")'});
            $(left).css({'background-image': 'url("/img/ticketleft.png")'});
            $(right).css({'background-image': 'url("/img/ticketright.png")', 'width':'19px'});
            $(font).css({color : 'black'});
        }
    });
    //количество билетов

    function addTick(nameRazdel, inputAmount, nameForInput, nameForLabel) {
        var row = $("#"+nameRazdel+">.row").length;
        var amount = $("#"+inputAmount).val();
        var razn = Math.abs(amount - row);
        if(amount>row && amount!=null){

            for(var i=0; i<razn; i++){
                var number = i + row + 1;
                var rowTick = "<div id='"+nameRazdel+number+"' class=\"row\">\n" +
                    "<div class=\"ticket\">\n" +
                    "<label>"+nameForLabel+number+"</label><br>\n" +
                    "<input type=\"text\" class=\"name\" name=\"name["+nameForInput+number+"][fio]\" value=\"\"><br>\n" +
                    "<input type=\"checkbox\" name=\"check["+nameForInput+number+"][pass]\">\n" +
                    "<label>+Fast Pass>></label><br>\n" +
                    "</div>\n" +
                    "<div class=\"img\">\n" +
                    "<div class=\"leftBock\">\n" +
                    "<h3></h3>\n" +
                    "</div>\n" +
                    "<div class=\"rightBock\"></div>\n" +
                    "</div>\n" +
                    "</div>";
                $("#"+nameRazdel).append(rowTick);
            }

        }
        if(amount<row && amount!=''){
            for(var i=0; i<razn; i++){
                var number = row-i;
                $("#"+nameRazdel+number).remove();
            }

        }
    }
    $("#adult").keyup(function(){
        addTick("adultBlock", "adult", "ad", "Adult");
    });
    $("#child").keyup(function () {
        addTick("childBlock", "child", "ch", "Child");
    });
    $("#senior").keyup(function () {
        addTick("seniorBlock", "senior", "sn", "Senior");
    });

    //анимация карты
    function selectAniation(city, place){
        var svgobject = document.getElementById('imap');
        var svgdom = svgobject.contentDocument;
        var dot = svgdom.getElementById(city);
        if(place=="in"){
            //dot.style.fill="gold";
            $(dot).attr('transform', 'scale(2 2) translate(-125 -125)');
        }else{
           // dot.style.fill="#CC1559";
            //$(dot).html("");
            $(dot).attr('transform', 'scale(1 1) translate(1)');
        }
    }
    $("#cityName1").mouseover(function(){
        /*var svgobject = document.getElementById('imap');
        if ('contentDocument' in svgobject) {

            var svgdom = svgobject.contentDocument;
            var dot = svgdom.getElementById("city1");
            dot.style.fill="gold";
            console.log('нашлась', dot);
        }*/
        selectAniation("city1","in");
    });
    $("#cityName1").mouseout(function(){
        selectAniation("city1","out");
    });
    $("#cityName2").mouseover(function () {
        selectAniation("city2","in");
    });
    $("#cityName2").mouseout(function () {
        selectAniation("city2","out");
    });
    $("#cityName3").mouseover(function () {
        selectAniation("city3","in");
    });
    $("#cityName3").mouseout(function () {
        selectAniation("city3","out");
    });
});
