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
const p1ScoreChange = document.querySelector('#p1__text');
const p2ScoreChange = document.querySelector('#p2__text');
const p1winnerText = document.querySelector('.x__wins-text');
const p2winnerText = document.querySelector('.o__wins-text');

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
let firstPlayerMove = true;
let xPlayerMoves = [];
let oPlayerMoves = [];
let xScoreElement;
let oScoreElement;
let ifChosen;
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;

pickX.addEventListener('click', function (event){
    ifChosen = true;
    pickX.classList.add('active');
    pickO.classList.remove('active');
    xScoreElement = p1Score;
    oScoreElement = p2Score;
    p1ScoreChange.innerHTML = "X (P1)"
    p2ScoreChange.innerHTML = "O (P2)"
    p1winnerText.innerHTML = "PLAYER 1 WINS"
    p2winnerText.innerHTML = "PLAYER 2 WINS"
});

pickO.addEventListener('click', function (event){
    ifChosen = true;
    pickO.classList.add('active');
    pickX.classList.remove('active');
    oScoreElement = p2Score;
    xScoreElement = p1Score;
    p1ScoreChange.innerHTML = "X (P2)"
    p2ScoreChange.innerHTML = "O (P1)"
    p1winnerText.innerHTML = "PLAYER 2 WINS"
    p2winnerText.innerHTML = "PLAYER 1 WINS"
});

multiplayerBtn.addEventListener('click', (event) => {
    if(ifChosen){
        mainPage.style.display = "none";
        actionGame.style.display = "block";
    }
});

for(let i = 0; i < 9; i++){
    cellBody[i].addEventListener('click', (event) => {
            board(i);  
});

function board(i){
    if (playAllowed){
        if(firstPlayerMove && (cellBody[i].childElementCount === 0)){
            play('x', 'o');        
            firstPlayerMove = false;
        } else if (!firstPlayerMove && cellBody[i].childElementCount === 0) {   
                play('o', 'x');
                firstPlayerMove = true;
            }
    }
}

function play(player, opponent){
    cellBody[i].innerHTML = `<img class="` + player + `__for-game" src="./img/icon-` + player + `40.svg" alt="">`;
    turnChange.innerHTML = `<img class="turn__change" src="./img/icon-` + opponent + `16.svg" alt=""> <p class="game__turn-text">TURN</p>`;
    turnDefault.style.display = "none";
    let winPlayerblock, playerWinsBcg;
    if(player == 'x'){
        xPlayerMoves.push(i);
        changeHover();
        winPlayerblock = winXblock;
        playerWinsBcg = xWinsBcg;
        if (checkWin(player, xPlayerMoves, winPlayerblock, playerWinsBcg)){
            xWinCount++;
            xScoreElement.innerText = xWinCount;
        }
    } else {
        oPlayerMoves.push(i);
        changeHover();
        winPlayerblock = winOblock;
        playerWinsBcg = oWinsBcg;
        if (checkWin(player, oPlayerMoves, winPlayerblock, playerWinsBcg)){
            oWinCount++;
            oScoreElement.innerText = oWinCount;
        } 
    } 
}

function checkWin(player, playerMoves, winPlayerblock, playerWinsBcg){
    let playerWins;
    winCombination.map(combination => {
        let winningCombination = combination.every((number) => playerMoves.includes(number));    
            if(winningCombination){
                for(let j = 0; j < 3; j++){
                    cellBody[combination[j]].innerHTML = `<img class="` + player + `__for-game" src="./img/icon-` + player + `-outline.svg" alt="">`;
                    if(window.screen.width < 768){
                        if (player == "x"){
                            cellBody[combination[j]].style.background = "url(img/icon-x-40black.svg) rgb(49, 195, 189) no-repeat center";
                        } else if (player == "o") {
                            cellBody[combination[j]].style.background = "url(img/icon-o-40black.svg) #F2B137 no-repeat center";
                        }
                    } else {
                        if (player == "x"){
                            cellBody[combination[j]].style.background = "url(img/icon-x-64black.svg) rgb(49, 195, 189) no-repeat center";
                        } else if (player == "o") {
                            cellBody[combination[j]].style.background = "url(img/icon-o-64black.svg) #F2B137 no-repeat center";
                            
                        }
                    }
                }
                winPlayerblock.style.display = "flex"; 
                playerWinsBcg.style.display = "block";
                playerWins = true;
            }
        })
        if (!playerWins && checkDraw()){
            tieCount++;
            tieScore.innerText = tieCount;
            resultTieblock.style.display = "flex"; 
            tieResultBcg.style.display = "block";
        };
    return playerWins;
}

function checkDraw(){
    return xPlayerMoves.length == 5 && oPlayerMoves.length == 4;
}

/* Restart button functionality in the corner */

restartBtn.addEventListener('click', (event) => {
    restartBcg.style.display = "block";
    restartContent.style.display = "flex";
})

restartCancel.addEventListener('click', (event) => {
    clearMoves();
})

restartConfirm.addEventListener('click', (event) => {
    cellBody[i].innerHTML = "";
    clearMoves();
    clearScore();
    setInitialConditions();
});

/* General functionality */

function changeHover() {
    for(let l = 0; l < cellBody.length; l++){
        if(!(xPlayerMoves.includes(l) || oPlayerMoves.includes(l))){
            if(firstPlayerMove){
                cellBody[l].classList.add("o__icon-hover")
                cellBody[l].classList.remove("x__icon-hover") 
            } else {
                cellBody[l].classList.add("x__icon-hover") 
                cellBody[l].classList.remove("o__icon-hover")
            }
        } else {
            cellBody[l].classList.remove("o__icon-hover")
            cellBody[l].classList.remove("x__icon-hover") 
        }
    }
}

function clearMoves(){
    restartBcg.style.display = "none"
    restartContent.style.display = "none"
    xPlayerMoves = [];
    oPlayerMoves = [];
}

function clearScore(){
    p1Score.innerText = xWinCount = 0;
    p2Score.innerText = oWinCount = 0;
    tieScore.innerText = tieCount = 0;
}

function navToMain(){
    mainPage.style.display = "flex";
    actionGame.style.display = "none";
    pickO.classList.remove('active');
    pickX.classList.remove('active');
}

function clearBoardElements(){
    cellBody[i].innerHTML = "";
    cellBody[i].style.background = "";
    winXblock.style.display = "none";
    xWinsBcg.style.display = "none";
    winOblock.style.display = "none";
    oWinsBcg.style.display = "none";
    resultTieblock.style.display = "none";
    tieResultBcg.style.display = "none"; 
}

function setInitialConditions(){
    playAllowed = true;
    firstPlayerMove = true;
    turnChange.innerHTML = `<img class="turn__change" src="./img/icon-x16.svg" alt=""> <p class="game__turn-text">TURN</p>`;
}

/* Quit and Next Round buttons after a round is finished */

for (let k = 0; k < quit.length; k++) {
    quit[k].addEventListener('click', (event) => {
        navToMain();
        clearMoves();
        clearScore();
        clearBoardElements()
        setInitialConditions();
    });

    nextRound[k].addEventListener('click', (event) => {
        clearBoardElements();
        clearMoves();
        setInitialConditions();
    });
}
}