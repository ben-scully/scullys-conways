var outOfBounds = require('./outOfBounds')

function indicesOutOfBounds(rowIndex, columnIndex, array2D) {
  return outOfBounds(rowIndex,array2D) || outOfBounds(columnIndex, array2D)
}

module.exports = indicesOutOfBounds
