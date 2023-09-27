const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");



let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
];

//CREATE A FUNCTION TO INITIALISE A GAME

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
////IN UI ALSO WE HAVE TO EMPTY
  boxes.forEach((box,index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //REMOVE THE GREEN COLOR.initialise THE BOXES WITH CSS PROPERTIES AGAIN
     box.classList = `box box${index+1}`; 
     
  });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
}
else{
    currentPlayer = "X";
}
//UI UPDATE
gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
}


function checkGameOver() {
    //TODO
    let answer = "";

    winningPositions.forEach((position) => {
        ///ALL THREE BOXES SHOULD BE NON EMPTY AND EXACTLY SAME IN VALUE
        if((gameGrid[position[0]]!== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="")
         && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){
        ///CHECK IF WINNER IS X
        if(gameGrid[position[0]] === "X")
        answer = "X";
    else
    answer = "O";

    //DISABLE POINTER EVENT
    boxes.forEach((box)=>{
        box.style.pointerEvents = "none";
    })

    //NOW WE KNOW X/O IS A WINNER
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");
        }
    });
    //IT MEANS WE HAVE A WINNER
    if(answer !==""){
       gameInfo.innerText = `winner player - ${answer}`;
       newGameBtn.classList.add("active");
       return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !=="")
        fillCount++;
    }); 
    if (fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
}
}

function handleClick(index){
    if(gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
    //SWAP KARO TURN KO
    swapTurn();
    //Check koi jeet toh nahi gaya
    checkGameOver();
    }
}


boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
})

});


newGameBtn.addEventListener("click",initGame);



