const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const WIDTH_BOARD = 300
const HEIGHT_BOARD = 500
const COLUMSN_BOARD = WIDTH_BOARD / BLOCK_SIZE
const ROWS_BOARD = HEIGHT_BOARD / BLOCK_SIZE
const FILL = 0.8
const board = Array(ROWS_BOARD).fill(0).map(e => {
  return Array(COLUMSN_BOARD).fill(0)
})

let y = 2
const x = 5
// console.log(board)

canvas.width = WIDTH_BOARD
canvas.height = HEIGHT_BOARD
canvas.style.border = '1px solid white'

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const piece = {
  block: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  position: {
    y,
    x
  }
}

function update () {
  if (y !== 24) {
    setTimeout(() => {
      window.requestAnimationFrame(update)
      draw()
    }, 300)
  }

  // if (y === 3) {
  //   collision(piece, x, y)
  // }
}

function draw () {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  drawGrid(COLUMSN_BOARD, ROWS_BOARD)

  context.fillStyle = 'purple'
  drawPiece(piece, x, y)
  collision(piece, x, y)

  y = gravity(y)
}

function drawGrid (width, heigth) {
  let condicional = true
  for (let y = 0; y < heigth; y++) {
    for (let x = 0; x < width; x++) {
      if (condicional) {
        drawBlockMatriz(x, y, y)
        condicional = false
      } else {
        drawBlockMatriz(x, y, x)
      }
    }
    condicional = true
  }
}

function drawBlockMatriz (x, y, id) {
  context.font = '1px Arial' // Fuente y tamaño
  context.fillStyle = 'green' // Color del texto
  context.fillText(id, x, y + 1) // Texto, posición x, y

  context.strokeStyle = 'gray'
  context.lineWidth = 0.1
  context.strokeRect(x, y, 1, 1)
}

function drawBlockVisualization (x, y) {
  context.strokeStyle = 'green'
  context.lineWidth = 0.1
  context.strokeRect(y + 0.1, x + 0.1, 0.8, 0.8)
}

function drawPiece (piece, x, y) {
  const ejeX = x
  piece.block.forEach(array => {
    array.forEach(e => {
      if (e === 1) {
        context.fillRect(x + 0.1, y + 0.1, FILL, FILL)
      }
      x++
    })
    x = ejeX
    y++
  })
  piece.position.y = y
}

function gravity (y) {
  if (y < ROWS_BOARD) {
    // collision(y)
    y++
  } else {
    y = 2
  }

  return y
}

function collision (piece, x, y) {
  let globalY = y
  let globalX = x
  const length = piece.position.x + piece.block[0].length - 1

  if (piece.position.y === (ROWS_BOARD)) {
    console.log('llegamops al final bueno', piece.position.y)
    board[y].forEach(column => {
      if (column !== 1) {
        piece.block.forEach(array => {
          array.forEach(column => {
            if (column === 1) {
              if (globalX <= length && globalY <= piece.position.y) {
                board[globalY][globalX] = 1
                globalX++
              }
            }
          })
          globalY++
          globalX = x
        })
      }
      globalY = y
    })
  } else {
    board[piece.position.y - 1].forEach(column => {
      if (column === 1) {
        piece.block.forEach(array => {
          array.forEach(column => {
            if (column === 1) {
              console.log(globalX, length, globalY, piece.position.y)
              if (globalX <= length && globalY <= piece.position.y) {
                board[globalY][globalX] = 1
                globalX++
              }
            }
          })
          globalY++
          globalX = x
        })
      }
    })
  }
}

update()

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    console.log('hello bitch')
  }
})
