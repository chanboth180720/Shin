var canvas = document.getElementById("myGame");
var context = canvas.getContext('2d');

//score
var score = 0;
var time = 60;

//property of square
var x = 5;
var y = 5;
var speed = 1;
var sideLenght = 10;

//property of target square
var targetX = 200;
var targetY = 50;
var targetLenght = 10;
var up = false;
var down = false;
var right = false;
var left = false;

function isWithin(a, b, c) {
    return (a>b && a<c);
}

function erase() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 600, 400,);
}

function respawn() {
    targetX = Math.round(Math.random() * canvas.width - targetLenght);
    targetY = Math.round(Math.random() * canvas.height - targetLenght);
}

function draw() {
    //clearscreen
    erase();
    //Todo: Update location base on keyboard click
    if(down) {
        y += speed;
    }
    if(up) {
        y -= speed;
    }
    if(right) {
        x += speed;
    }
    if(left) {
        x -= speed; //x = x - speed
    }

    //keep the square within the border
    if (y + sideLenght > canvas.height) {
        y = canvas.height - sideLenght;
    }
    if (x + sideLenght > canvas.width) {
        x = canvas.width - sideLenght;
    }
    if (y < 0) {
        y = 0;
    }
    if (x < 0) {
        x = 0;
    }
    //Detect if big square collides with target
    if(isWithin(targetX, x, x + sideLenght) || isWithin(targetX + targetLenght, x, x + sideLenght)) {
        if(isWithin(targetY, y, y + sideLenght) || isWithin(targetY + targetLenght, y, y + sideLenght)) {
            //Respawn target: delete old target, and random new target at other location
            respawn();
            //increase score
            score++;
            console.log("get score", score);
        }
    }

    //Draw
    context.fillStyle="#6FB2B8";
    context.fillRect(x, y, sideLenght, sideLenght);

    //Draw target
    context.fillStyle="#B26FB8";
    context.fillRect(targetX, targetY, targetLenght, targetLenght);
    
    if(time <= 0) {
        //Game end
        context.font = "20px";
        context.fillStyle ='black' ;
        context.fillText('!!GameOver!! Your Score is:'+ score, 90, canvas.height/2-5);
        return;
    }else {
        window.requestAnimationFrame(draw);
    }
}

//canvas.addEventListener('keyup', function(event) {
//    event.preventDefault();
//    console.log(event.keyCode);

//});

setInterval(function() {
    time--;
    console.log('time', time);
}, 1000);

canvas.addEventListener('keydown', function(event) {
    event.preventDefault();
    console.log(event.key);
    down = false;
    up = false;
    left = false;
    right = false;
    if(event.key == "ArrowDown") {
        down = true;
    }else if(event.key == "ArrowUp") {
        up = true;
    }else if(event.key == "ArrowLeft") {
        left = true;
    }else if(event.key == "ArrowRight") {
        right = true;
    }
});
draw();
//image

