var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 2

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


function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.lineWidth = lineWidth
  context.stroke()
}

var using = false
var lastPoint = {
  x: undefined,
  y: undefined
}

if (document.body.ontouchstart !== undefined) {
  canvas.ontouchstart = function (a) {
    using = true
    var x = a.touches[0].clientX
    var y = a.touches[0].clientY
    drawCircle(x, y, lineWidth / 2)

    //console.log(lastPoint.x,lastPoint.y)
    if (usingEraser) {
      context.clearRect(x, y, 10, 10)
    } else {
      lastPoint.x = x
      lastPoint.y = y
    }
  }

  canvas.ontouchmove = function (a) {
    var x = a.touches[0].clientX
    var y = a.touches[0].clientY
    if (usingEraser) {
      if (using) {
        context.clearRect(x, y, 10, 10)
      }
    } else {
      if (using) {

        drawCircle(x, y, lineWidth / 2)
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

  canvas.ontouchend = function (z) {
    using = false
  }
} else {
  canvas.onmousedown = function (a) {
    using = true
    var x = a.clientX
    var y = a.clientY
    drawCircle(x, y, lineWidth / 2)

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

        drawCircle(x, y, lineWidth / 2)
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
}

var usingEraser = false
eraser.onclick = function () {
  usingEraser = true
  brush.classList.remove('active')
  eraser.classList.add('active')
}

brush.onclick = function () {
  usingEraser = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}

red.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}

yellow.onclick = function () {
  context.fillStyle = 'yellow'
  context.strokeStyle = 'yellow'
  red.classList.remove('active')
  yellow.classList.add('active')
  blue.classList.remove('active')
}

blue.onclick = function () {
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  yellow.classList.remove('active')
  blue.classList.add('active')
}

clear.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

save.onclick = function () {
  var url = canvas.toDataURL("image/png")
  var a = document.createElement('a')
  a.href = url
  a.download = 'picture'
  a.click()
  a.remove()
}

thin.onclick = function () {
  lineWidth = 2
}

thick.onclick = function () {
  lineWidth = 5
}