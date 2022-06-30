//Variables and Constant
let speed = 8;
let score = 0;
let lasttime = 0;
let inputDir = {x:0,y:0};


const foodSound = new Audio('sound/food.mp3');
const musicSound = new Audio('sound/game_over.mp3');


let SnakeArr = [
    { x:13,y:15 }
]

food = { x:6,y:7 };


//Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lasttime)/1000 < (1/speed))   return
    
    lasttime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < SnakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
            return true;
        }
}

function gameEngine(){
    if(isCollide(SnakeArr)){
        score = 0;
        musicSound.play();
        inputDir = {x:0,y:0};
        alert("Game Over ! Press any Key to play Again!");
        SnakeArr = [{x:13,y:15}];
        scorebox.innerHTML = "Score:" + score;
    }

    //If you have Eaten the food , increment the score and regenrate the food
    if(SnakeArr[0].y === food.y && SnakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hscorevalue){
            hscorevalue = score;
            localStorage.setItem("highscore",JSON.stringify(hscorevalue));
            highscorebox.innerHTML = "High Score: "+ hscorevalue ;
        }
        scorebox.innerHTML = "Score:" + score;
        SnakeArr.unshift({x: SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+ (b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random())}
    }    
    
    //moving the snake
    for (let i = SnakeArr.length-2; i >=0 ; i--) {
        SnakeArr[i+1] = {...SnakeArr[i]};
    }

    SnakeArr[0].x += inputDir.x;
    SnakeArr[0].y += inputDir.y;
    
    //Updating snake array & display the snake

    board.innerHTML = "";
    SnakeArr.forEach((e,index)=>{
        SnakeElement = document.createElement('div');
        SnakeElement.style.gridRowStart = e.y;
        SnakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            SnakeElement.classList.add('head');    
        }else{
            SnakeElement.classList.add('snake');
        }
        board.appendChild(SnakeElement);
    })
   
    //Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


//Logic
let hscore = localStorage.getItem("highscore");
if(hscore === null){
    hscorevalue = 0;
    localStorage.setItem("highscore",JSON.stringify(hscorevalue));
}
else{
    hscorevalue = JSON.parse(hscore)
    highscorebox.innerHTML = "High Score: "+ hscore ;
}
musicSound.pause();
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir = {x:0 ,y:1}//start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;z
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            inputDir.x = 0;
            inputDir.y = 0;
            break;
    }
    
});