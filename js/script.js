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
const quitFromWinX = document.querySelector('.x__quit');
const quitFromWinO = document.querySelector('.o__quit');
const quitFromTie = document.querySelector('.tie__quit');
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

let playAllowed = true;
let xPlayerMoves = [];
let oPlayerMoves = [];
let firstPlayer = true;
let ifChoosen;
let xPlayer = "Player X"; 
let oPlayer = "Player O";
let currentClass;
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
                }
                winPlayerblock.style.display = "flex"; 
                playerWinsBcg.style.display = "block";
                playerWins = true;
            }
        })

    return playerWins;
}

function restartButtons(){
    restartBcg.style.display = "none"
    restartContent.style.display = "none"
}

function play(player, opponent, position){
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
    // restartConfirm.addEventListener('click', (event) => {
    //     cellBody[position].innerHTML = "";
    //     restartButtons();

    // });
}

function board(i){
    if(playAllowed && cellBody[i] && firstPlayer && (cellBody[i].childElementCount === 0)){
                firstPlayer = false;
                play('x', 'o', i);
                
            } else if (playAllowed && firstPlayer === false) {
            if(cellBody[i].childElementCount === 0){
                firstPlayer = true;
                play('o', 'x', i);
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
    cellBody[i].addEventListener('click', (event) => {
            board(i);         
});

quitFromWinX.addEventListener('click', (event) => {
        playAllowed = false;
    	winXblock.style.display = "none";
        xWinsBcg.style.display = "none";
});

quitFromWinO.addEventListener('click', (event) => {
    playAllowed = false;
    winOblock.style.display = "none";
    oWinsBcg.style.display = "none";
});

quitFromTie.addEventListener('click', (event) => {
    playAllowed = false;
    resultTieblock.style.display = "none";
    tieResultBcg.style.display = "none";
});



restartBtn.addEventListener('click', (event) => {
    restartBcg.style.display = "block"
    restartContent.style.display = "flex"
})

restartCancel.addEventListener('click', (event) => {
    restartButtons();
})

}