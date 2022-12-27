const playerFactory = (num, name, marker, moves, winner) => {
  return { num, name, marker, moves, winner };
};

const gameBoard = (() => {
  //declare rules, create players and set starting points
  const winningAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let playerOne = "";
  let playerTwo = "";
  let activePlayer = "";
  let rounds = 0;

  //game functions
  function playRound(e, targetCell) {
    targetCell.innerHTML = activePlayer.marker;
    activePlayer.moves.push(Number(e.target.id));

    rounds = rounds + 1;
    console.log(rounds);
    winnerCheck();

    rounds === 9 ? console.log("DRAW") : false;
    activePlayer.winner === true
      ? console.log(activePlayer.name + " WON!")
      : switchPlayers();
  }

  const createPlayer = (name) => {
    playerOne = playerFactory(1, name, "X", []);
    playerTwo = playerFactory(2, "Volan de Mort", "O", []);
    activePlayer = playerOne;
  };

  function switchPlayers() {
    activePlayer === playerOne
      ? (activePlayer = playerTwo)
      : (activePlayer = playerOne);
    return { activePlayer };
  }

  function winnerCheck() {
    for (let i = 1; i < winningAxes.length; i++) {
      if (
        winningAxes[i].every((element) => activePlayer.moves.includes(element))
      ) {
        activePlayer.winner = true;
        console.log(activePlayer.winner);
        return { activePlayer };
      }
    }
  }

  console.log(activePlayer);

  return {
    playerOne,
    playerTwo,
    activePlayer,
    rounds,
    switchPlayers,
    winnerCheck,
    createPlayer,
    playRound,
  };
})();

const displayController = (() => {
  const startBtn = document.querySelector(".start-button");
  const gridCells = document.querySelectorAll(".cell");

  //event listener for the grid
  gridCells.forEach((occurence) => {
    occurence.addEventListener(
      "click",
      (e) => {
        let targetCell = document.getElementById(e.target.id);
        gameBoard.playRound(e, targetCell);
      },
      { once: true }
    );
  });

  startBtn.addEventListener("click", () => {
    gameBoard.createPlayer("Harry Potter");
  });
})();
