const pickX = document.getElementById('pick__btn-x');
const pickO = document.getElementById('pick__btn-o');
const pathOfIcon = document.querySelectorAll('.pick__action-icon path')
const cpuBtn = document.querySelector('#cpu__btn');
const multiplayerBtn = document.querySelector('#player__btn');
const mainPage = document.querySelector('.main__page');
const actionGame = document.querySelector('.active__game');
const cellBody = document.querySelectorAll('.cell__body');
const xForGame = document.querySelector('.x__for-game');
const oForGame = document.querySelector('.o__for-game');
const turnDefault = document.querySelector('.turn__default')
const pickActionIcon = document.querySelectorAll('.pick__action-icon');
const turnChange = document.querySelector(".game__turn");
const quit = document.querySelectorAll('.quit');
const nextRound = document.querySelectorAll('.next__round')
const winXblock = document.querySelector('.x__wins');
const winOblock = document.querySelector('.o__wins');
const resultTieblock = document.querySelector('.tie__content');
const xWinsBcg = document.querySelector('.x__wins-background');
const oWinsBcg = document.querySelector('.o__wins-background');
const tieResultBcg = document.querySelector('.tie__bcg');
const p1Score = document.getElementById('p1__score');
const p2Score = document.getElementById('p2__score');
const tieScore = document.getElementById('tie__score');
const restartBtn = document.querySelector('.game__return');
const restartBcg = document.querySelector('.restart__bcg');
const restartContent = document.querySelector('.restart__content');
const restartCancel = document.querySelector('.restart__cancel');
const restartConfirm = document.querySelector('.restart__confirm');


const winCombination = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let movesLeft = [0, 1, 2, 3, 4, 5, 6, 7, 8]

let playAllowed = true;
let xPlayerMoves = [];
let oPlayerMoves = [];
let firstPlayer = true;
let ifChoosen;
let currentClass;
let currentPlayer = "x";
let isDraw;
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;


function checkWin(player, playerMoves, winPlayerblock, playerWinsBcg){
    let playerWins;
    winCombination.map(combination => {
        let winningCombination = combination.every((number) => playerMoves.includes(number));    
            if(winningCombination){
                for(let j = 0; j < 3; j++){
                    cellBody[combination[j]].innerHTML = `<img class="` + player + `__for-game" src="./img/icon-` + player + `-outline.svg" alt="">`;
                    if (player == "x"){
                        cellBody[combination[j]].style.background = "url(img/icon-x-40black.svg) rgb(49, 195, 189) no-repeat center";
                    } else if (player == "o") {
                        cellBody[combination[j]].style.background = "url(img/icon-o40black.svg) #F2B137 no-repeat center";
                } 
                if(winPlayerblock && playerWinsBcg){
                    winPlayerblock.style.display = "flex"; 
                    playerWinsBcg.style.display = "block";
                }
              
                playerWins = true;
            } 

            } 
        })
       
        return playerWins;
}

function play(player, opponent, position){
    for(let i = 0; i < movesLeft.length; i++){
        if(player === 'o'){
            cellBody[movesLeft[i]].classList.add("x__icon-hover")
           
        } else {
            cellBody[movesLeft[i]].classList.add("o__icon-hover")
            } 
               
            }
         
    

    cellBody[position].innerHTML = `<img class="` + player + `__for-game" src="./img/icon-` + player + `40.svg" alt="">`;
    turnChange.innerHTML = `<img class="turn__change" src="./img/icon-` + opponent + `16.svg" alt=""> <p class="game__turn-text">TURN</p>`;
    turnDefault.style.display = "none";
    let winPlayerblock, playerWinsBcg;
    if(player == 'x'){
        xPlayerMoves.push(position);
        winPlayerblock = winXblock;
        playerWinsBcg = xWinsBcg;
        if (checkWin(player, xPlayerMoves, winPlayerblock, playerWinsBcg)){
            xWinCount++;
            p1Score.innerText = xWinCount;
        }
    } else {
        oPlayerMoves.push(position);
        winPlayerblock = winOblock;
        playerWinsBcg = oWinsBcg;
        if (checkWin(player, oPlayerMoves, winPlayerblock, playerWinsBcg)){
            oWinCount++;
            p2Score.innerText = oWinCount;
        }
    } 

        cellBody[position].addEventListener('mouseover', (event) => {
        cellBody[position].style.background = ""
    }) 

}
    



for(i = 0; i < quit.length; i++) { 
quit[i].addEventListener('click', (event) => {
    cellBody[i].innerHTML = "";
    cellBody[i].style.background = "";
    winXblock.style.display = "none";
    xWinsBcg.style.display = "none";
    mainPage.style.display = "flex";
    actionGame.style.display = "none";
    pickO.classList.remove('active');
    pickX.classList.remove('active');
    p1Score.innerText = xWinCount = 0;
    p2Score.innerText = oWinCount = 0;
    tieScore.innerText = tieCount = 0;
    playAllowed = true;
    restartButtons();
});
}

restartConfirm.addEventListener('click', (event) => {
    cellBody[i].innerHTML = "";
    restartButtons();
});

for(i = 0; i < nextRound.length; i++){
nextRound[i].addEventListener('click', (event) => {
    xPlayerMoves = [];
    oPlayerMoves = [];
    cellBody[i].innerHTML = "";
    cellBody[i].style.background = "";
    winXblock.style.display = "none";
    xWinsBcg.style.display = "none";
    winOblock.style.display = "none";
    oWinsBcg.style.display = "none";

})
  
    
    // resultTieblock.style.display = "none";
    // tieResultBcg.style.display = "none";          // TO DO
    
}

function restartButtons(){
    restartBcg.style.display = "none"
    restartContent.style.display = "none"
    xPlayerMoves = [];
    oPlayerMoves = [];
}

function board(i){
    const index = movesLeft.findIndex((num) => num === i )
    cellBody[movesLeft[index]].classList.remove("x__icon-hover")
    cellBody[movesLeft[index]].classList.remove("o__icon-hover")

    if(playAllowed && cellBody[i] && firstPlayer && (cellBody[i].childElementCount === 0)){
                movesLeft.splice(index, 1)
                play('x', 'o', i);
                firstPlayer = false;
                
            } else if (playAllowed && firstPlayer === false) {
            if(cellBody[i].childElementCount === 0){
                movesLeft.splice(index, 1)

                play('o', 'x', i);
                firstPlayer = true;
            }
        }
}

pickX.addEventListener('click', function (event){
    ifChoosen = true;
    pickX.classList.add('active');
    pickO.classList.remove('active');
});

pickO.addEventListener('click', function (event){
    ifChoosen = true;
    pickO.classList.add('active');
    pickX.classList.remove('active');
});

multiplayerBtn.addEventListener('click', (event) => {
    if(ifChoosen){
        mainPage.style.display = "none";
        actionGame.style.display = "block";
    }
});

for(let i = 0; i < 9; i++){
    cellBody[movesLeft[i]].classList.add("x__icon-hover")
    cellBody[i].addEventListener('click', (event) => {
        board(i);

});

restartBtn.addEventListener('click', (event) => {
    restartBcg.style.display = "block"
    restartContent.style.display = "flex"
})

restartCancel.addEventListener('click', (event) => {
    restartButtons();
})

}