const cells = document.querySelectorAll('.cell') 
const statusText = document.getElementById('status') 
const restartBtn = document.getElementById('restartButton') 

let isXTurn = true 
let gameActive = true 
let board = ['', '', '', '', '', '', '', '', ''] // 9 cells 

const winConditions = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns 
    [0, 4, 8], [2, 4, 6] // diagonals 
    ] 
    
    cells.forEach(cell => cell.addEventListener('click', handleClick)) 
    restartBtn.addEventListener('click', startGame) 
    
    function handleClick(e) { 
        const cell = e.target 
        const index = parseInt(cell.getAttribute('data-cell')) 
        
        if (!gameActive || board[index]!== '') return 
        
        const currentPlayer = isXTurn? 'X' : 'O' 
        board[index] = currentPlayer 
        cell.textContent = currentPlayer 
        cell.style.color = 'black' 
        cell.style.fontWeight = '900' 
        
        checkWinner() 
        
        if (gameActive) { 
            isXTurn =!isXTurn 
            statusText.textContent = isXTurn? "Player X's turn" : "Player O's turn" 
        } 
    } 
    
    function checkWinner() { 
        let roundWon = false 
        for (let i = 0; i < winConditions.length; i++) { 
            const [a, b, c] = winConditions[i] 
            if (board[a] && board[a] === board[b] && board[a] === board[c]) { 
                roundWon = true 
                break 
            } 
        } 
        
        if (roundWon) { 
            statusText.textContent = `Player ${isXTurn? 'X' : 'O'} Wins!` 
            gameActive = false 
            return 
        } 
        
        if (!board.includes('')) { 
            statusText.textContent = "It's a Draw!" 
            gameActive = false 
            return 
        } 
    } 
    
    function startGame() { 
        board = ['', '', '', '', '', '', '', ''] // reset 9 cells 
        isXTurn = true 
        gameActive = true 
        statusText.textContent = "Player X's turn" 
        cells.forEach(cell => cell.textContent = '') 
    }