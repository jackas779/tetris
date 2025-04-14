const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const WIDTH_BOARD = 300
const HEIGHT_BOARD = 500
const COLUMSN_BOARD = WIDTH_BOARD / BLOCK_SIZE
const ROWS_BOARD = HEIGHT_BOARD / BLOCK_SIZE

canvas.width = WIDTH_BOARD
canvas.height = HEIGHT_BOARD
canvas.style.border = '1px solid white'

context.scale(BLOCK_SIZE, BLOCK_SIZE)

function draw () {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  drawGrid(COLUMSN_BOARD, ROWS_BOARD)
}

function drawGrid (width, heigth) {
  for (let y = 0; y < heigth; y++) {
    for (let x = 0; x < width; x++) {
      drawBlockMatriz(x, y)
    }
  }
}

function drawBlockMatriz (x, y) {
  context.strokeStyle = 'black'
  context.lineWidth = 0.1
  context.strokeRect(x, y, 1, 1)
}

function drawBlockVisualization (x, y) {
  context.strokeStyle = 'green'
  context.lineWidth = 0.1
  context.strokeRect(y + 0.1, x + 0.1, 0.8, 0.8)
}
draw()
