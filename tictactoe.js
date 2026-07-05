const cells = document.querySelectorAll('[data-cell]'); 
const statusText = document.getElementById('status'); 
const restartBtn = document.getElementById('restartBtn'); 
let currentPlayer = 'X'; 
let gameActive = true; 
let board = ['', '', ''];

const winConditions = [ 
    [0,1,2], [3,4,5], [6,7,8], // rows 
    [0,3,6], [1,4,7], [2,5,8], // cols 
    [0,4,8], [2,4,6] // diagonals 
];

cells.forEach(cell => cell.addEventListener('click', handleClick)); 
restartBtn.addEventListener('click', restartGame);

function handleClick(e) { 
    const index = Array.from(cells).indexOf(e.target); 
    if (board[index]!== '' ||!gameActive) return; 
    
    board[index] = currentPlayer; 
    e.target.textContent = currentPlayer; 
    
    if (checkWin()) { 
        statusText.textContent = `Player ${currentPlayer} Wins! 🔥`; 
        gameActive = false; 
    } else if (board.every(cell => cell!== '')) { 
        statusText.textContent = `Draw! 🤝`; 
        gameActive = false; 
    } else { 
        currentPlayer = currentPlayer === 'X'? 'O' : 'X'; 
        statusText.textContent = `Player ${currentPlayer}'s turn`; 
    } 
} 
function checkWin() { 
    return winConditions.some(condition => { 
        return condition.every(index => board[index] === currentPlayer); 
    }); 
} 

function restartGame() { 
    board = ['', '', '']; 
    gameActive = true; 
    currentPlayer = 'X'; 
    statusText.textContent = `Player X's turn`; 
    cells.forEach(cell => cell.textContent = ''); 
}