var Site = {

  // GLOBAL VARS
  videoElement: document.querySelector('video'),
  canvasCopyElement: document.getElementById("canvas-copy"),
  canvasShotElement: document.getElementById("canvas-shot"),
  filters: ['grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate', 'saturate', 'invert', ''],
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
    $("#take-shot").click(function() {
      Site.snapShot();
    });
    Site.videoElement.addEventListener('click', Site.changeFilter, false);
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
    var ctx = Site.canvasCopyElement.getContext('2d');

    setInterval(function(){
      drawSeveral();
     
      
      /*if(!same) {
        var img = new Image();
          img.src = Site.canvasCopyElement.toDataURL("image/jpg");
          Site.imageDump.appendChild(img); 
      }*/
      // document.body.style.backgroundColor = color;
    }, 1000);

    function drawSeveral() {
      // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
      ctx.drawImage(Site.videoElement, 0, 0, Site.canvasCopyElement.width, Site.canvasCopyElement.height);
      Site.lastPixels     = Site.currentPixels;
      Site.currentPixels  = ctx.getImageData(0, 0, Site.canvasCopyElement.width, Site.canvasCopyElement.height);
      
      var same = Site.utils.equal(Site.lastPixels,Site.currentPixels,150),
          color = (same) ? Site.noMoves() : Site.yayMoves();
    }

  },

  noMoves: function(e) {
    document.body.style.backgroundColor = "green";
  },

  yayMoves: function(e) {
    document.body.style.backgroundColor = "red";
  },

  snapShot: function(e) {
    var ctx = Site.canvasShotElement.getContext('2d');

    // set canvas to be the same dimensions
    Site.canvasShotElement.width = Site.canvasShotElement.width = Site.videoElement.videoWidth;
    Site.canvasShotElement.height = Site.videoElement.videoHeight;

    // draw snapshot
    ctx.drawImage(Site.videoElement,0,0);

    //var data = ctx.getImageData(0,0,canvas.width,canvas.height);
    // for(n=0; n<data.width*data.height; n++) {  
    //   var index = n*4;   
    //   data.data[index+0] = 255-data.data[index+0];  
    //   data.data[index+1] = 255-data.data[index+1];  
    //   data.data[index+2] = 255-data.data[index+2];
    // } 
    //ctx.putImageData(data,0,0);
  },

  captureWebcam: function(e) {
    if(navigator.webkitGetUserMedia!=null) { 
      var options = { 
        video:true, 
        audio:true 
      };
      navigator.webkitGetUserMedia(options, 
        function(stream) { 
          Site.videoElement.src = window.webkitURL.createObjectURL(stream); 
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