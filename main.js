import { calculateWinner } from "./calculateWinner.js"
import { createBtn, createBoard, renderHistoryList } from "./ui.js"

startGame()

function startGame() {
  let cells = Array(9).fill(null)
  let history = []

  let winner
  let draw = false

  let xTurn = true

  const board = createBoard(cells, markCell)
  const boardTitle = document.querySelector("#board-title")
  const resetBtn = createBtn(resetGame)
  board.insertAdjacentElement("afterend", resetBtn)

  function markCell(idx) {
    if (cells[idx] || winner) return

    history.push([...cells])
    renderHistoryList(history, goBack)

    cells[idx] = xTurn ? "X" : "O"
    render()

    if (!winner && !draw) {
      xTurn = !xTurn
      nextPlayer()
    }
  }

  function render() {
    const boardCells = document.querySelectorAll(".cell")
    boardCells.forEach((cell, idx) => {
      cell.textContent = cells[idx]
    })

    winner = calculateWinner(cells)

    if (winner) {
      boardTitle.textContent = `${winner} wins!`
      resetBtn.style.display = "block"
    } else if (cells.every((c) => c)) {
      boardTitle.textContent = "Draw!"
      draw = true
      resetBtn.style.display = "block"
    }
  }

  function goBack(idx) {
    if (winner || draw) return

    cells = history[idx]
    history = history.slice(0, idx)

    xTurn = idx % 2 === 0
    nextPlayer()

    renderHistoryList(history, goBack)
    render()
  }

  function clearHistory() {
    history = []
    renderHistoryList(history, goBack)
  }

  function nextPlayer() {
    boardTitle.textContent = xTurn ? "X's turn" : "O's turn"
  }
  nextPlayer()

  function resetGame() {
    cells.fill(null)
    xTurn = true
    draw = false
    resetBtn.style.display = "none"
    nextPlayer()
    clearHistory()
    render()
  }
}
