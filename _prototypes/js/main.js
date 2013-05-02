var Site = {

  // GLOBAL VARS
  videoElement: $('#slowmo-video')[0],
  webcamElement: $('#webcam-container')[0],
  canvasCopyElement: $("#canvas-copy")[0],
  contextCopy: $("#canvas-copy")[0].getContext('2d'),
  //canvasShotElement: document.getElementById("canvas-shot"),
  filters: ['grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate', 'saturate', 'invert', ''],
  notesPos: [0, 82, 159, 238, 313, 390, 468, 544],
  idx: 0,
  currentPixels: "",
  lastPixels: "",
  //imageDump: document.querySelector('.imageDump'),
  
  // grabbed from https://github.com/wesbos/HTML5-Security-Camera
  utils: {
    diff: function(array1, array2) {
      return array1.filter(function(i) {
        return (array2.indexOf(i) > -1);
      });
    },
    equal: function(a, b, tolerance) {
      var aData   = a.data,
          bData   = b.data,
          length  = aData.length,
          i;
      tolerance = tolerance || 0;
      for (i = length; i--;) if (aData[i] !== bData[i] && Math.abs(aData[i] - bData[i]) > tolerance) return false;
      return true;
    }
  },

  // INIT
  init: function(e) {
    Site.buildHandlers();
    Site.comparePixels();
  },

  buildHandlers: function(e) {
    $("#capture-button").click(function() {
      Site.captureWebcam();
    });
    // $("#take-shot").click(function() {
    //   Site.snapShot();
    // });
    Site.webcamElement.addEventListener('click', Site.changeFilter, false);

    Site.canvasCopyElement.width = 200;
    Site.canvasCopyElement.height = 150;

  },

  //
  changeFilter: function(e) {
    var el = e.target;
    el.className = '';
    var effect = Site.filters[Site.idx++ % Site.filters.length]; // loop through filters.
    if (effect) { el.classList.add(effect); }
  },

  // grabbed from https://github.com/wesbos/HTML5-Security-Camera
  comparePixels: function(e) {

    setInterval(function(){
      
      Site.contextCopy.drawImage(Site.webcamElement, 0, 0, Site.canvasCopyElement.width, Site.canvasCopyElement.height);

      Site.lastPixels     = Site.currentPixels;
      Site.currentPixels  = Site.contextCopy.getImageData(0, 0, Site.canvasCopyElement.width, Site.canvasCopyElement.height);
      
      var same = Site.utils.equal(Site.lastPixels,Site.currentPixels,60),
          color = (same) ? Site.noMoves() : Site.yayMoves();
     
      /*if(!same) {
        var img = new Image();
          img.src = Site.canvasCopyElement.toDataURL("image/jpg");
          Site.imageDump.appendChild(img); 
      }*/
      // document.body.style.backgroundColor = color;

    }, 33);

  },

  noMoves: function(e) {
    //document.body.style.backgroundColor = "green";
    Site.videoElement.pause();
  },

  yayMoves: function(e) {
    //document.body.style.backgroundColor = "red";
    Site.videoElement.play();
  },

  /*
  snapShot: function(e) {
    var ctx = Site.canvasShotElement.getContext('2d');

    // set canvas to be the same dimensions
    Site.canvasShotElement.width = Site.canvasShotElement.width = Site.webcamElement.videoWidth;
    Site.canvasShotElement.height = Site.webcamElement.videoHeight;

    // draw snapshot
    ctx.drawImage(Site.webcamElement,0,0);

    //var data = ctx.getImageData(0,0,canvas.width,canvas.height);
    // for(n=0; n<data.width*data.height; n++) {  
    //   var index = n*4;   
    //   data.data[index+0] = 255-data.data[index+0];  
    //   data.data[index+1] = 255-data.data[index+1];  
    //   data.data[index+2] = 255-data.data[index+2];
    // } 
    //ctx.putImageData(data,0,0);
  },
  */

  captureWebcam: function(e) {
    if(navigator.webkitGetUserMedia!=null) { 
      var options = { 
        video:true, 
        audio:true 
      };
      navigator.webkitGetUserMedia(options, 
        function(stream) { 
          Site.webcamElement.src = window.webkitURL.createObjectURL(stream); 
        },
        function(e) { 
          alert("You need to allow webcam access for this page");
          console.log("There was a problem with webkitGetUserMedia"); 
        } 
      );
    }
  }

}

$(document).ready(function() { Site.init(); });