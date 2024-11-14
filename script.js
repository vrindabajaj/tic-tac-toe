const Gameboard = (() => {
    const board = Array(9).fill(null);

    const placeMarker = (index, playerMark) => {
        board[index] = playerMark;
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

const GameController = (() => {
    let player1, player2;
    let currentPlayer;
    let isGameWon;

    const startGame = () => { 
        player1 = Player("Player 1", "X");
        player2 = Player("Player 2", "O");
        currentPlayer = player1;

        resetGame();
        ScreenController.updateTurnAnnouncement(`Player 1's turn`);
        ScreenController.addCellListener();
        ScreenController.addBtnListener();
    }

    const turn = (index) => {
        const board = Gameboard.getBoard();

        if (!isGameWon && board[index] === null) {
            Gameboard.placeMarker(index, currentPlayer.marker);
            ScreenController.renderBoard();

            if (checkWin()){
                isGameWon = true;
                ScreenController.updateTurnAnnouncement(`${currentPlayer.name} wins!`);
            } else if (checkTie()){
                isGameWon = true;
                ScreenController.updateTurnAnnouncement(`It's a tie!`);
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                ScreenController.updateTurnAnnouncement(`${currentPlayer.name}'s turn`);
            }
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

    const checkTie = () => {
        const board = Gameboard.getBoard();
        return !board.includes(null);
    }

    const resetGame = () => {
        Gameboard.resetBoard();
        isGameWon = false;
        ScreenController.renderBoard();
    }

    return { startGame, turn };
})();

const ScreenController = (() => {
    const renderBoard = () => {
        const board = Gameboard.getBoard();

        board.forEach((value, index) => {
            const cell = document.querySelector(`.cell[data-index='${index}']`);
            cell.textContent = value; 
        });
    }

    const addCellListener = () => {
        const cells = document.querySelectorAll(".cell");

        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const index = parseInt(cell.getAttribute("data-index"));
                GameController.turn(index);
            });
        });
    };

    const updateTurnAnnouncement = (announcement) => {
        const turnAnnouncement = document.querySelector(".turn-announcer");
        turnAnnouncement.textContent = announcement;
    }

    const addBtnListener = () => {
        const resetBtn = document.querySelector(".reset-btn");
        resetBtn.addEventListener("click", GameController.startGame);
    }

    return { renderBoard, addCellListener, updateTurnAnnouncement, addBtnListener };
})();

//Initialise game
GameController.startGame();