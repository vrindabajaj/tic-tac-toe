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

const checkWin = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions){
        const [a, b, c] = winConditions[condition];
        if (board[a] && board[a] == board[b] && board[b] == board[c] ){
            console.log("you win!");
            return true;
        }
    }
    return false;
}
