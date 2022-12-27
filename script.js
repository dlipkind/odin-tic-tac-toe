const gameModule = (() => {
    document.querySelectorAll('.cell').forEach(occurence => {
        occurence.addEventListener('click', (e) => {
            let activePlayer = playModule.activePlayer;
            let targetCell = document.getElementById(e.target.id);
            targetCell.innerHTML = activePlayer.marker;
            activePlayer.moves.push(Number(e.target.id));
            playModule.roundCount();
            playModule.winnerCheck();
            playModule.rounds === 9 ? console.log("DRAW") : false;
            activePlayer.winner === true ? console.log(activePlayer.name + " WON!") : playModule.switchPlayers();
        }, {once : true})
    });
})();


const playModule = (() => {
    //declare rules, create players and set starting points
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    const playerOne = createPlayers(1, 'Player 1', 'X', []);
    const playerTwo = createPlayers(2, 'Player 2', 'O', []);

    let activePlayer = playerOne;
    let rounds = 1;

    //game functions
    function createPlayers (num, name, marker, moves, winner) {
        return { num, name, marker, moves, winner };
    };

    function switchPlayers() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
        activePlayer = this.activePlayer;
        return { activePlayer };
    };

    function winnerCheck() {
        for (let i = 1; i < winningAxes.length; i++) {
            if (winningAxes[i].every(element => this.activePlayer.moves.includes(element))) {
                this.activePlayer.winner = true;
                console.log(activePlayer.winner);
                return { activePlayer };
            };
        };
    };

    function roundCount() {
        this.rounds = rounds++;
        console.log(rounds - 1);
        return (rounds);
    };
    
    console.log(activePlayer);

    return { 
        playerOne, 
        playerTwo, 
        activePlayer, 
        rounds, 
        switchPlayers, 
        roundCount,
        winnerCheck 
    };
})();



