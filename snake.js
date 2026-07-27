const canvas=document.querySelector(".canvas");
const ctx=canvas.getContext("2d");

console.log(ctx);
const scale=20;
const rows=canvas.height / scale; //25
const columns=canvas.width / scale;//25

let snake=[];
snake[0]={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*rows))*scale
}
let food={
    
        x:(Math.floor(Math.random()*columns))*scale,
        y:(Math.floor(Math.random()*rows))*scale
    }

 
let d="right";

document.onkeydown=direction;
function direction(event){
    let key=event.keyCode;
    if(key==37 && d !="right"){
        d="left";
    }
    else if(key==38 && d!="down"){
        d="up";
    }else if(key==39 && d!="left"){
        d="right";
    }else if(key==40 && d!="up"){
        d="down";
    }
}

//call our draw function every 100 ms
let playGame=setInterval(draw,100);

function draw(){
    ctx.clearRect(0, 0, canvas.width,canvas.height);

    for(let i=0;i<snake.length;i++){
         ctx.stokeStyle="pink";
ctx.fillStyle="#fff";
ctx.fillRect(snake[i].x,snake[i].y,scale,scale);
ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);

    }

   //draw food
   ctx.fillStyle="#ff0";
   ctx.strokeStyle="green";
   ctx.fillRect(food.x,food.y,scale,scale);
   ctx.strokeRect(food.x,food.y,scale,scale);

    //old head position 
let snakeX=snake[0].x;
let snakeY=snake[0].y;
console.log(snakeX);
//which direrction 
if(d=="left") snakeX -= scale;
if(d=="up")snakeY -= scale;
if(d=="right")snakeX += scale;
if(d=="down")snakeY+=scale;

if(snakeX>canvas.width){
    snakeX=0;
}
if(snakeY>canvas.height){
    snakeY=0;
}
if(snakeX<0){
    snakeX=canvas.width;
}
if(snakeY<0){
    snakeY=canvas.height;
}
// if the snake eats the food, it grows
if(snakeX==food.x && snakeY==food.y){
    food={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*rows))*scale
    }
}else{
    snake.pop();
}

let newHead={
    x:snakeX,
    y:snakeY
}

snake.unshift(newHead);
}
//check if the snake eats itself
function eatSelf(heads,array){
    for(let i=0; i<array.length; i++){
        if(heads.x==array[i].x && heads.y==array[i].y){
            return true;
        }
    }
    return false;
}