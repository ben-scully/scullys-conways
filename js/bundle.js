(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var nextBoard = require('./nextBoard')
var createBoard = require('./createBoard')
var board
var tileSize = 15
var canvas
var ctx
var widthTiles
var heightTiles

var int

module.exports = {
  initCanvas: initCanvas,
	renderBoard: renderBoard
}

function initCanvas (size) {
	var num = size || 20
	board = createBoard(num)
	widthTiles = board.length
	heightTiles = board[0].length

	canvas = document.getElementById("canvas")   // the canvas where game will be drawn
	ctx = canvas.getContext("2d")            // canvas context

	canvas.width = widthTiles * tileSize
	canvas.height = heightTiles * tileSize

	canvas.addEventListener('click', clickCanvas, false)

	var step = document.getElementById("step")
	step.addEventListener('click', updateBoard, false)

	var run = document.getElementById("run")
	run.addEventListener('click', repeatUpdateBoard, false)

	var stop = document.getElementById("stop")
	stop.addEventListener('click', stopIntervals, false)

	var clear = document.getElementById("clear")
	clear.addEventListener('click', clearBoard, false)
}

function renderBoard () {
	// clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "black"
	ctx.lineWidth = 0.2

	for (i = 0; i < widthTiles; i++) {
		for (j = 0; j < heightTiles; j++) {

			if (board[i][j])
				ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize)
			else
				ctx.strokeRect(j * tileSize, i * tileSize, tileSize, tileSize)
		}
	}
}

function clickCanvas (e) {
	var y = e.layerY
	var row = Math.floor(y/tileSize)

	var x = e.layerX
	var col = Math.floor(x/tileSize)

	changeBoardCell(row, col)
}

function changeBoardCell (row, col) {
	board[row][col] = !board[row][col]
	renderBoard()
}

function updateBoard () {
	board = nextBoard(board)
	renderBoard()
}

function repeatUpdateBoard () {
	int = setInterval(updateBoard, 400)
}

function clearBoard () {
	stopIntervals()
	initCanvas()
	renderBoard()
}

function stopIntervals () {
	if (int !== undefined)
		clearInterval(int)
}

},{"./createBoard":3,"./nextBoard":6}],2:[function(require,module,exports){
var getNeighbours = require('./getNeighbours')

function countAliveNeighbours(cellRow, cellColumn, board) {
  var arr = getNeighbours(cellRow, cellColumn, board)
  var filtered = arr.filter(function(val){
    return val
  })
  return filtered.length

}
module.exports = countAliveNeighbours

},{"./getNeighbours":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./indicesOutOfBounds":5}],5:[function(require,module,exports){
var outOfBounds = require('./outOfBounds')

function indicesOutOfBounds(rowIndex, columnIndex, array2D) {
  return outOfBounds(rowIndex,array2D) || outOfBounds(columnIndex, array2D)
}

module.exports = indicesOutOfBounds

},{"./outOfBounds":8}],6:[function(require,module,exports){
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

},{"./countAliveNeighbours":2,"./createBoard":3,"./nextCellState":7}],7:[function(require,module,exports){
var overPopulated = require('./overPopulated')
var underPopulated = require('./underPopulated')
var ressurectable = require('./ressurectable')

function nextCellState(cellState, neighbourCount) {
  if (!cellState)
    return ressurectable(neighbourCount)

  if (overPopulated(neighbourCount) || underPopulated(neighbourCount))
    return false

  return true
}

module.exports = nextCellState

},{"./overPopulated":9,"./ressurectable":10,"./underPopulated":12}],8:[function(require,module,exports){
function outOfBounds(index, array) {
  return index < 0 || index >= array.length
}
module.exports = outOfBounds

},{}],9:[function(require,module,exports){
function overPopulated(neighbourCount) {
  return neighbourCount > 3
}
module.exports = overPopulated

},{}],10:[function(require,module,exports){
function ressurectable(neighbourCount) {
  return neighbourCount === 3
}
module.exports = ressurectable

},{}],11:[function(require,module,exports){
var createBoard = require('./createBoard')
var canvas = require('./canvas')

var defaultSize = 20

canvas.initCanvas(defaultSize)
canvas.renderBoard()

},{"./canvas":1,"./createBoard":3}],12:[function(require,module,exports){
function underPopulated(neighbourCount) {
  return neighbourCount < 2
}

module.exports = underPopulated

},{}]},{},[11]);
