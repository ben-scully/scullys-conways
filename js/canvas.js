var nextBoard = require('./nextBoard')
var createBoard = require('./createBoard')
var board
var tileSize = 30
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
	var num = size || 10
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
	int = setInterval(updateBoard, 500)
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
