const Player = (move) => {
  const _playerMove = move;
  let _playerScore = 0;

  const getPlayerMove = () => _playerMove;

  const getPlayerScore = () => _playerScore;

  const playerWin = () => _playerScore += 1;

  return {
    getPlayerMove,
    getPlayerScore,
    playerWin,
  }
}

const GameState = () => {

  let boardState = Array(9).fill('');


  const boardUpdate = (cellIndex, player) => { boardState[cellIndex] = player.getPlayerMove() }

  const getBoardState = () => boardState;

  const resetBoard = () => boardState = Array(9).fill('');
  const resetBoardWinner = (winner) => boardState = Array(9).fill(`${winner}`);

  return {
    boardUpdate,
    getBoardState,
    resetBoard,
    resetBoardWinner,
  }
}

const domElements = () => {
  return {
    cells: document.querySelectorAll('.cell'),
    restartBtn: document.querySelector('#restartBtn'),
  }
}


const GameManager = (() => {
  const init = function () {
    let newGame = GameState();

    let playerTurn = true;

    const playerX = Player("X");

    const playerO = Player("O");

    const domElms = domElements();

    return [newGame, playerTurn, playerX, playerO, domElms];
  }

  let [newGame, playerTurn, playerX, playerO, domElms] = init();

  const renderBoard = () => {
    let i = 0;
    newGame.getBoardState().forEach(state => {
      domElms.cells[i].textContent = state;
      i++;
    });
    i = 0;
  }

  const restartBoard = () => {
    newGame.resetBoard()

    renderBoard()
  }

  const play = (e) => {
    const cell = e.currentTarget;
    let cellIndex = Array.prototype.indexOf.call(domElms.cells, cell);
    switch (playerTurn) {
      case true:
        if (newGame.getBoardState()[cellIndex] == '') {
          newGame.boardUpdate(cellIndex, playerX);
          playerTurn = false;
        }
        break;
      case false:
        if (newGame.getBoardState()[cellIndex] == '') {
          newGame.boardUpdate(cellIndex, playerO);
          playerTurn = true;
        }
        break;
      default:
        console.log("err")
    }
    renderBoard();
    checkWinner();

  }

  const checkWinner = () => {
    const board = newGame.getBoardState();
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        newGame.resetBoardWinner(board[a]);
        return;
      }
    }

    if (!board.includes('')) {
      newGame.resetBoard();
    }
  }

  domElms.cells.forEach(cell => cell.addEventListener('click', play));

  domElms.restartBtn.addEventListener('click', restartBoard)

})()