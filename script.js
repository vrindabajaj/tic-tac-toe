const Gameboard = (() => {
    const board = Array(9).fill(null);

    const placeMarker = (index, playerMark) => {
        board[index] = playerMark;
        console.log(board);
    }

    const resetBoard = () => {
        board.fill(null);
    }

    const getBoard = () => board;

    return { placeMarker, resetBoard, getBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
}


const Game = (() => {
    let player1, player2;
    let currentPlayer;
    
    let isGameWon = false;

    const startGame = () => {
        player1 = Player("Player 1", "X");
        player2 = Player("Player 2", "O");

        currentPlayer = player1;

        while (!isGameWon){
            turn();
        }
    }

    const turn = () => {
        // Find a random empty spot
        let index;
        const board = Gameboard.getBoard();

        do {
            index = Math.floor(Math.random() * 9);
        } while (board[index] !== null);

        Gameboard.placeMarker(index, currentPlayer.marker);

        if (checkWin()){
            isGameWon = true;
            console.log(`${currentPlayer.name} wins!`);
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winConditions = [
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for (const condition of winConditions){
            const [a, b, c] = condition;
            if (board[a] && board[a] == board[b] && board[b] == board[c]){
                return true;
            }
        }
        return false;
    }
    
    return { startGame };
})();