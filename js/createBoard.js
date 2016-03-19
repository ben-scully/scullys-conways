function createBoard(size) {
  var board = []

  for (i = 0; i < size; i++) {
    var row = []
    board.push(row)

    for (j = 0; j < size; j++) {
      row.push(false)
    }
  }
  return board
}

module.exports = createBoard
