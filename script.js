'use strict';

//Selecting elements
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0'); 
const player1El = document.querySelector('.player--1');

//Initial states of elements
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add('hidden');

let gameOver = false;
let currentScore = 0;
let activePlayer = 0;
let highScore = [0,0]

//switch player function
const switchPlayer = function()
{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer=(activePlayer===0?1:0);
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Determining the winner function
function isWinner(sc)
{
    if (sc>=25)
    {
        return(true);
    }
}

//Roll dice
btnRoll.addEventListener('click', function()
{
    if (!gameOver)
    {
        diceEl.classList.remove('hidden');
        const randomNum = Math.trunc(Math.random()*6+1);
        diceEl.src=`Images/dice-${randomNum}.png`;
        if (randomNum !== 1)
        {
            currentScore += randomNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else if (randomNum===1)
        {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function()
{
    if (!gameOver)
    {
        let flag=0;
        highScore[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = highScore[activePlayer];
        if (highScore[activePlayer]>=100)
        {
            gameOver = true;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');;
            flag=1;
        }
        if (flag===0)
        {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function()
{
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
    currentScore = 0;
    highScore[0]=0;
    highScore[1]=0;
    activePlayer = 0;
    gameOver=false;
});