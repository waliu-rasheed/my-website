const cellElements = document.querySelectorAll('[data-cell]') 
const board = document.getElementById('board')
const statusText = document.getElementById('status') 
const restartButton = document.getElementById('restartButton') 
let isXTurn = true 

startGame() 
restartButton.addEventListener('click', startGame) 

function startGame() { 
    isXTurn = true 
    statusText.textContent = "Player X's turn"
    cellElements.forEach(cell => { 
    cell.textContent = '' 
    cell.addEventListener('click', handleClick, { once: true }) 
}) 
} 

function handleClick(e) { 
    const cell = e.target 
    cell.textContent = isXTurn ? 'X' :'O' 
    statusText.textContent = isXTurn ? "Player O's turn" : "Player X's turn"
    isXTurn = !isXTurn }