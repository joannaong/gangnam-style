// # Example call for the demo at http//cbrandolino.github.com/camvas

// If the browser does not support any URL, getUserMedia or
// In this example call, we will directly draw the webcam stream on a canvas.
window.onload = function(){
  var ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
  var draw = function(video, dt) {
    ctx.drawImage(video, 0, 0)
  }
  var myCamvas = new camvas(ctx, draw)
}

// # The camvas.js library

// requestAnimationFrame implementation, we just ignore it.
// My policy for experimental software is: if you don't have a
// nightly build, you don't deserve exceptions.
window.URL = window.URL || window.webkitURL

navigator.getUserMedia  = navigator.getUserMedia || 
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || 
                          navigator.msGetUserMedia

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame

// The function takes a canvas context and a `drawFunc` function.
// `drawFunc` receives two parameters, the video and the time since
// the last time it was called.
function camvas(ctx, drawFunc) {
  var self = this
  this.ctx = ctx
  this.draw = drawFunc

  // We can't `new Video()` yet, so we'll resort to the vintage
  // "hidden div" hack for dynamic loading.
  var streamContainer = document.createElement('div')
  this.video = document.createElement('video')

  // If we don't do this, the stream will not be played.
  // By the way, the play and pause controls work as usual 
  // for streamed videos.
  this.video.setAttribute('autoplay', '1')

  // The video should fill out all of the canvas
  this.video.setAttribute('width', this.ctx.canvas.width)
  this.video.setAttribute('height', this.ctx.canvas.height)

  this.video.setAttribute('style', 'display:none')
  streamContainer.appendChild(this.video)
  document.body.appendChild(streamContainer)

  // The callback happens when we are starting to stream the video.
  navigator.getUserMedia({video: true}, function(stream) {
    // Yay, now our webcam input is treated as a normal video and
    // we can start having fun
    self.video.src = window.URL.createObjectURL(stream)
    // Let's start drawing the canvas!
    self.update()
  })

  // As soon as we can draw a new frame on the canvas, we call the `draw` function 
  // we passed as a parameter.
  this.update = function() {
    var self = this
    var last = Date.now()
    var loop = function() {
      // For some effects, you might want to know how much time is passed
      // since the last frame; that's why we pass along a Delta time `dt`
      // variable (expressed in milliseconds)
      var dt = Date.now - last
      self.draw(self.video, dt)
      last = Date.now()
      requestAnimationFrame(loop) 
    }
    requestAnimationFrame(loop) 
  } 
}

