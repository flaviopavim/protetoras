function adjust() {
//    if ($(window).height() > $('#logo').height()) {
        $('#logo').css({
            top: (($(window).height() / 2) - ($('#logo').height() / 2) - 90)
        });
//        $('#inicio').css({
//            paddingTop: (($(window).height() / 2) - ($('#logo').height() / 2) - 50)
//        });
//    } else {
//        $('#logo').css({marginTop: 30});
//    }

    var minHeight=$(window).height();
    if (minHeight<850) {
        minHeight=850;
    }

    $('#inicio').height(minHeight);
}

function constrain(x,min,max) {
    if (x<min) {
        x=min;
    }
    if (x>max) {
        x=max;
    }
    return x;
}

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function mapConstrain(x, in_min, in_max, out_min, out_max) {
    var y=map(x, in_min, in_max, out_min, out_max);
    return constrain(y,out_min,out_max);
}

var blink_cat = false;
var timer_cat = 2000;
var blink_dog = false;
var timer_dog = 2000;
function blinkCat() {
    if (blink_cat) {
        $('#cat-eye-left, #cat-eye-right').css({width: 20, height: 2, marginTop: 12, marginLeft: -3});
        setTimeout(function () {
            blinkCat();
        }, 200);
    } else {
        $('#cat-eye-left, #cat-eye-right').css({width: 9, height: 17, margin: 'auto'});
    }
    blink_cat = !blink_cat;
}
function blinkDog() {
    if (blink_dog) {
        $('#dog-eye-left, #dog-eye-right').css({width: 20, height: 2, marginTop: 12, marginLeft: -3});
        setTimeout(function () {
            blinkDog();
        }, 200);
    } else {
        $('#dog-eye-left, #dog-eye-right').css({width: 9, height: 17, margin: 'auto'});
    }
    blink_dog = !blink_dog;
}

var count_cat = 0;
var count_dog = 0;

$(document).ready(function () {
    adjust();
    timer_cat = 10 + Math.floor(Math.random() * 30);
    timer_dog = 10 + Math.floor(Math.random() * 30);
    setInterval(function () {
        count_cat++;
        if (count_cat > timer_cat) {
            count_cat = 0;
            timer_cat = 10 + Math.floor(Math.random() * 30);
            blinkCat();
        }
        count_dog++;
        if (count_dog > timer_dog) {
            count_dog = 0;
            timer_dog = 10 + Math.floor(Math.random() * 30);
            blinkDog();
        }
        //console.log(count_cat);
    }, 100);
});


var lastx=0;
var lasty=0;

function animate(event) {
    var x = lastx = event.pageX;
    var y = lasty = event.pageY;
    $("#coordinates").text("X: " + x + ", Y: " + y);

    var move = 8;

    var w = $(window).width();
    var h = $(window).height();

    $('#cat-eye-left').css({left: mapConstrain(x, 0, w, 70 - move, 70 + move)});
    $('#cat-eye-right').css({left: mapConstrain(x, 0, w, 140 - move, 140 + move)});
    $('#cat-eye-left').css({top: mapConstrain(y, 0, h, 260 - move, 260 + move)});
    $('#cat-eye-right').css({top: mapConstrain(y, 0, h, 260 - move, 260 + move)});

    $('#dog-eye-left').css({left: mapConstrain(x, 0, w, 290 - move, 290 + move)});
    $('#dog-eye-right').css({left: mapConstrain(x, 0, w, 350 - move, 350 + move)});
    $('#dog-eye-left').css({top: mapConstrain(y, 0, h, 260 - move, 260 + move)});
    $('#dog-eye-right').css({top: mapConstrain(y, 0, h, 260 - move, 260 + move)});



}
$(document).mousemove(function (event) {
    animate(event);
});
$(window).resize(function (event) {
    adjust();
    animate(event);
});

function playAudio(str) {
    var audio = new Audio('audio/'+str+'.mp3');
    audio.play();
}

function meow() {
    playAudio('meow');
    $('#cat-mouth').css({top:288});
    $('#cat-noose').css({top:292});
    setTimeout(function(){
        $('#cat-mouth').css({top:290});
        $('#cat-noose').css({top:290});
    },100);
}

function bark() {
    playAudio('bark');
    $('#dog-mouth-bg').css({top:312});
    $('#dog-mouth').css({top:292});
    setTimeout(function(){
        $('#dog-mouth-bg').css({top:315});
        $('#dog-mouth').css({top:290});
    },100);
}

$(window).click(function(event){
    
    var y = event.pageY;
    
    if (y<1000) {
        if (Math.round(Math.random())==0) {
            meow();
        } else {
            bark();
        }
    }
    
    
});


window.setInterval(function(){
    if (lastx<1000) {
        if (Math.floor(Math.random() * 10)==0) {
            if (Math.round(Math.random())==0) {
                meow();
            } else {
                bark();
            }
        }
    }
},1000);