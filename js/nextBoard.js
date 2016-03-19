var nextCellState = require('./nextCellState')
var countAliveNeighbours = require('./countAliveNeighbours')
var createBoard = require('./createBoard')

function nextBoard(currentBoard) {

  var size =  currentBoard.length
  var newBoard = createBoard(size)

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {

      var cell = currentBoard[i][j]
      var cellCount = countAliveNeighbours(i, j, currentBoard)
      newBoard[i][j] = nextCellState( cell, cellCount)
    }
  }

  return newBoard
}

module.exports = nextBoard
