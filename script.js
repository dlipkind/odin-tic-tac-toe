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

  const playerOne = createPlayers(1, "Player 1", "X", []);
  const playerTwo = createPlayers(2, "Player 2", "O", []);

  let activePlayer = playerOne;
  let rounds = 0;

  //game functions
  function createPlayers(num, name, marker, moves, winner) {
    return { num, name, marker, moves, winner };
  }

  function switchPlayers() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
    activePlayer = this.activePlayer;
    return { activePlayer };
  }

  function winnerCheck() {
    for (let i = 1; i < winningAxes.length; i++) {
      if (
        winningAxes[i].every((element) =>
          this.activePlayer.moves.includes(element)
        )
      ) {
        this.activePlayer.winner = true;
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

        targetCell.innerHTML = gameBoard.activePlayer.marker;
        gameBoard.activePlayer.moves.push(Number(e.target.id));

        gameBoard.rounds = gameBoard.rounds + 1;
        console.log(gameBoard.rounds);
        gameBoard.winnerCheck();

        gameBoard.rounds === 9 ? console.log("DRAW") : false;
        gameBoard.activePlayer.winner === true
          ? console.log(gameBoard.activePlayer.name + " WON!")
          : gameBoard.switchPlayers();
      },
      { once: true }
    );
  });

  // startBtn.addEventListener("click", () => {
  //   gameBoard.getNames();
  // });
})();
