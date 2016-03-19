var createBoard = require('./createBoard')
var canvas = require('./canvas')

var defaultSize = 10

// #2 initialise canvas (with dimensions of the board)
canvas.initCanvas(defaultSize)
canvas.renderBoard()

// #3 print the canvas (using the board.matrix)
// redrawCanvas()

// onClick
// -> clickon a square
//     updates the board.matrix
//     reprints the canvas with the updated board.matrix
