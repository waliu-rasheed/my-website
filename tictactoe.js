const cellElements = document.querySelectorAll('[data-cell]') 
const board = document.getElementById('board') 
const statusText = document.getElementById('status') 
const restartButton = document.getElementById('restartButton') 
let isXTurn = true 
let gameActive = true 

const WINNING_COMBINATIONS = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns 
    [0, 4, 8], [2, 4, 6] // diagonals 
    ] 
    
    startGame() 
    restartButton.addEventListener('click', startGame) 
    
    function startGame() { 
        isXTurn = true 
        gameActive = true 
        statusText.textContent = "Player X's turn" 
        cellElements.forEach(cell => { 
            cell.textContent = '' 
            cell.addEventListener('click', handleClick, { once: true }) 
        }) 
    }
    
    function handleClick(e) { 
        if (!gameActive) return 
        const cell = e.target 
        const currentPlayer = isXTurn? 'X' : 'O' 
        cell.textContent = currentPlayer 
        
        if (checkWin(currentPlayer)) { 
            statusText.textContent = `Player ${currentPlayer} Wins! 🎉` 
            gameActive = false 
            return 
        } 
        
        if (isDraw()) { 
            statusText.textContent = "It's a Draw! 🤝" 
            gameActive = false 
            return 
        } 
        
        isXTurn =!isXTurn 
        statusText.textContent = isXTurn? "Player X's turn" : "Player O's turn" 
    } 
    
    function checkWin(currentPlayer) { 
        return WINNING_COMBINATIONS.some(combination => { 
            return combination.every(index => { 
                return cellElements[index].textContent === currentPlayer 
            }) 
        }) 
    } 
    
    function isDraw() { 
        return [...cellElements].every(cell => { 
            return cell.textContent === 'X' || cell.textContent === 'O' 
        }) 
    }
