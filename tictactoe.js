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

        // reset cells
        cellElements.forEach(cell => { 
            cell.textContent = ''
            cell.style.pointerEvents = 'auto'
            cell.replaceWith(cell.cloneNode(true)) // this removes old listeners 
        }) 
        // ADD THIS LIE - re-get cells after cloning
        cellElements = document.querySelectorAll('.cell')

        // then add listeners
        cellElements.forEach(cell => {
            cell.addEventListener('click', handleClick)
        })
    }

    function handleClick(e) { 
      if (!gameActive) return 
      
      const cell = e.target 
      
      // 1. Don't click filled cells 
      if (cell.textContent !== '') return 
     
      // 2. Place X or O 
      const currentPlayer = isXTurn ? 'X' : 'O' 
      cell.textContent = currentPlayer 
      cell.style.pointerEvents = 'none' // lock this cell 
      
      // 3. Check win 
      if (checkWin(currentPlayer)) { 
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉` 
        gameActive = false 
        cellElements.forEach(cell => cell.style.pointerEvents = 'none') 
        setTimeout(() => { 
            startGame() 
        }, 2000) 
        return 
    } 
    
    // 4. Check draw 
    if (isDraw()) { 
        statusText.textContent = "It's a Draw! 🤝" 
        gameActive = false 
        cellElements.forEach(cell => cell.style.pointerEvents = 'none') 
        setTimeout(() => { 
            startGame() 
        }, 2000) 
        return 
    } 
    
    // 5. THIS IS THE MOST IMPORTANT LINE - Switch turns 
    isXTurn = !isXTurn 
    statusText.textContent = isXTurn ? "Player X's turn" : "Player O's turn" 
}