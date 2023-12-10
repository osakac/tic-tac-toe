export function createBtn(callback) {
  const button = document.createElement("button")
  button.classList.add("btn")
  button.style.display = "none"
  button.textContent = "Play again"
  button.addEventListener("click", callback)
  return button
}

export function createBoard(cells, callbackClick) {
  const board = document.querySelector(".board")

  cells.forEach((el, idx) => {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.dataset.index = idx
    cell.addEventListener("click", () => callbackClick(idx))
    board.append(cell)
  })

  return board
}

export function createAside() {
  const aside = document.querySelector(".aside")
  return aside
}

export function renderHistoryList(history, callbackBackToHistory) {
  const historyList = document.querySelector(".aside")
  historyList.innerHTML = ""

  history.forEach((period, idx) => {
    const li = document.createElement("li")
    const btn = document.createElement("button")

    btn.textContent = `Back to #${idx + 1} turn`
    btn.classList.add("aside-btn")

    btn.addEventListener("click", () => callbackBackToHistory(idx))

    li.append(btn)
    historyList.append(li)
  })
}
