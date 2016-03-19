var getNeighbours = require('./getNeighbours')

function countAliveNeighbours(cellRow, cellColumn, board) {
  var arr = getNeighbours(cellRow, cellColumn, board)
  var filtered = arr.filter(function(val){
    return val
  })
  return filtered.length

}
module.exports = countAliveNeighbours
