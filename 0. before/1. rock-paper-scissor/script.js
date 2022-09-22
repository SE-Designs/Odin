"use strict";

let computerSelection = "";
let playerSelection = "";
let computerScore = 0;
let playerScore = 0;
let dashboard = [];

const result = document.getElementById("result");
const afterResult = document.getElementById("after-result");
const computerSelected = document.getElementById("computer-selected");
const playerSelected = document.getElementById("player-selected");
const computerScoreBlock = document.getElementById("computer-score");
const playerScoreBlock = document.getElementById("player-score");

function getComputerChoice() {
  let computerChoice = Math.round(Math.random() * 2);
  let computerSelection = "";

  switch (computerChoice) {
    case 0:
      computerSelection = "Rock";
      break;

    case 1:
      computerSelection = "Paper";
      break;

    case 2:
      computerSelection = "Scissor";
      break;
  }

  return computerSelection;
}

const btns = document.querySelectorAll("#btn");
btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    getPlayerChoice(i);
    game();
  });
});

function getPlayerChoice(i) {
  let playerChoice = "";
  // console.log(playerChoice);
  switch (i) {
    case 0:
      playerChoice = "Rock";
      break;
    case 1:
      playerChoice = "Paper";
      break;
    case 2:
      playerChoice = "Scissor";
      break;
  }

  computerSelection = getComputerChoice();
  playerSelection = playerChoice;
}

function playRound() {
  console.log("Computer Choice:", computerSelection);
  console.log("Player Choice:", playerSelection);
  // -1 - computer wins
  // 0 - draw
  // 1 - player wins
  let playerWin = -1;
  if (computerSelection === "Rock") {
    if (playerSelection === "Paper") {
      playerWin = 1;
    }

    if (playerSelection === "Rock") {
      playerWin = 0;
    }
  }

  if (computerSelection === "Paper") {
    if (playerSelection === "Scissor") {
      playerWin = 1;
    }

    if (playerSelection === "Paper") {
      playerWin = 0;
    }
  }

  if (computerSelection === "Scissor") {
    if (playerSelection === "Rock") {
      playerWin = 1;
    }

    if (playerSelection === "Scissor") {
      playerWin = 0;
    }
  }

  return playerWin;
}

function getWinner() {
  const playerWin = playRound();
  let finalMessage = "";

  switch (playerWin) {
    case -1:
      finalMessage = "Computer Wins!";
      computerScore++;
      break;

    case 0:
      finalMessage = "Draw!";
      break;

    case 1:
      finalMessage = "Player Wins!";
      playerScore++;
      break;
  }

  result.innerHTML = finalMessage;
  afterResult.innerHTML = `${playerSelection} vs ${computerSelection}`;
  dashboard = [computerScore, playerScore];

  if (computerScore >= 5 || playerScore >= 5) {
    let isPlayerWinned;
    if (computerScore >= 5) {
      isPlayerWinned = false;
    } else {
      isPlayerWinned = true;
    }
    resetGame(isPlayerWinned);
  }

  return dashboard;
}

function game() {
  let dashboard = getWinner();

  const computerScore = dashboard[0];
  const playerScore = dashboard[1];
  computerScoreBlock.innerHTML = `Computer: ${computerScore}`;
  playerScoreBlock.innerHTML = `Player: ${playerScore}`;
}

function resetGame(isPlayerWinned) {
  let timer = 5;
  btns.forEach((btn) => {
    btn.disabled = true;
  });
  isPlayerWinned
    ? (result.innerHTML = "You saved the Earth.")
    : (result.innerHTML = "Humanity will be doomed!");

  afterResult.innerHTML = `Page will be refreshed in ${timer} seconds.`;
  setInterval(() => {
    timer--;
    if (timer === 0) {
      location.reload();
    }
    afterResult.innerHTML = `Page will be refreshed in ${timer} seconds.`;
  }, 1000);
}
