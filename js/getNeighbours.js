var indicesOutOfBounds = require('./indicesOutOfBounds')

function getNeighbours(cellRow, cellColumn, board) {
  var arr = []

  for (i = cellRow-1; i <= cellRow+1; i++) {
    for (j = cellColumn-1; j <= cellColumn+1; j++) {

      if (i === cellRow && j === cellColumn) {
        continue
      }
      if (!indicesOutOfBounds(i, j, board)) {
        arr.push(board[i][j])
      }
    }
  }

  return arr
}
module.exports = getNeighbours
