var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')


autoSetCanvasSize()


function autoSetCanvasSize() {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


// function drawCircle(x, y, radius) {
//   context.beginPath();
//   context.arc(x, y, radius, 0, Math.PI * 2)
//   context.fill()
// }

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.lineWidth = 2
  context.stroke()
}

var using = false
var lastPoint = {
  x: undefined,
  y: undefined
}

canvas.onmousedown = function (a) {
  using = true
  var x = a.clientX
  var y = a.clientY
  //drawCircle(x, y, 1)

  //console.log(lastPoint.x,lastPoint.y)
  if (usingEraser) {
    context.clearRect(x, y, 10, 10)
  } else {
    lastPoint.x = x
    lastPoint.y = y
  }
}

canvas.onmousemove = function (a) {
  var x = a.clientX
  var y = a.clientY
  if (usingEraser) {
    if (using) {
      context.clearRect(x, y, 10, 10)
    }
  } else {
    if (using) {

      //drawCircle(x, y, 1)
      var newPoint = {
        x: x,
        y: y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint.x = newPoint.x
      lastPoint.y = newPoint.y
    }
  }
}

canvas.onmouseup = function (z) {
  using = false
}

var usingEraser = false
var eraser = document.getElementById('eraser')
eraser.onclick = function () {
  usingEraser = true
  var action = document.getElementById('action')
  action.classList.add('x')
}

var brush = document.getElementById('brush')
brush.onclick = function () {
  usingEraser = false
  var action = document.getElementById('action')
  action.classList.remove('x')
}