// forked from http://www.adobe.com/devnet/html5/articles/javascript-motion-detection.html

(function() {

	function hasGetUserMedia() {
		// Note: Opera builds are unprefixed.
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}
	var webcamError = function(e) { alert('Webcam error!', e); };
	var video = $('#webcam')[0];

	$(".title").click(function(){
		if (navigator.getUserMedia) {
			navigator.getUserMedia({audio: true, video: true}, function(stream) {
				video.src = stream;
				init();
			}, webcamError);
		} else if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
				video.src = window.webkitURL.createObjectURL(stream);
				init();
			}, webcamError);
		}
	});

	var timeOut, lastImageData;
	var canvasSource = $("#canvas-source")[0];
	var canvasBlended = $("#canvas-blended")[0];
	var contextSource = canvasSource.getContext('2d');
	var contextBlended = canvasBlended.getContext('2d');
	var myVideo = $("#my-video")[0];
	var notes = [];

	// mirror video
	contextSource.translate(canvasSource.width, 0);
	contextSource.scale(-1, 1);

	// INIT
	function init() {

		myVideo.pause();
		$("#my-video").fadeIn();
		$(".title").fadeOut();

		// add grid to the array
		for (var i=0; i<80; i++) {
			var note = {
				note: "note"+i,
				ready: true,
				visual: $("#note" + i)[0]
			};
			note.area = {
				x: $("#note"+i).position().left,
				y: $("#note"+i).position().top, 
				width: 100, 
				height: 100
			};
			notes.push(note);
		}
		update();
	}

	function update() {
		drawVideo();
		blend();
		checkAreas();
		// timeOut = setTimeout(update, 1000/60);
		timeOut = setTimeout(update, 60);
	}

	function drawVideo() {
		contextSource.drawImage(video, 0, 0, video.width, video.height);
	}

	function blend() {
		var width = canvasSource.width;
		var height = canvasSource.height;
		// get webcam image data
		var sourceData = contextSource.getImageData(0, 0, width, height);
		// create an image if the previous image doesn’t exist
		if (!lastImageData) lastImageData = contextSource.getImageData(0, 0, width, height);
		// create a ImageData instance to receive the blended result
		var blendedData = contextSource.createImageData(width, height);
		// blend the 2 images
		differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
		// draw the result in a canvas
		contextBlended.putImageData(blendedData, 0, 0);
		// store the current webcam image
		lastImageData = sourceData;
	}

	function fastAbs(value) {
		// funky bitwise, equal Math.abs
		return (value ^ (value >> 31)) - (value >> 31);
	}

	function threshold(value) {
		return (value > 0x15) ? 0xFF : 0;
	}

	function difference(target, data1, data2) {
		// blend mode difference
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
			target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
			target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function differenceAccuracy(target, data1, data2) {
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			var diff = threshold(fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function checkAreas() {
		myVideo.pause();

		// loop over the note areas
		for (var r=0; r<80; ++r) {
			// get the pixels in a note area from the blended image
			var blendedData = contextBlended.getImageData(notes[r].area.x, notes[r].area.y, notes[r].area.width, notes[r].area.height);
			var i = 0;
			var average = 0;
			// loop over the pixels
			while (i < (blendedData.data.length * 0.25)) {
				// make an average between the color channel
				average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
				++i;
			}
			// calculate an average between of the color values of the note area
			average = Math.round(average / (blendedData.data.length * 0.25));

			$("#note"+r+" span").removeClass("active");

			if (average > 10) {

				$("#note"+r+" span").addClass("active");

				if (notes[r].note == "note0") {
					$("#canvas-source").addClass("sepia");
					$("#canvas-source").removeClass("contrast hue-rotate saturate");
				
				} else if (notes[r].note == "note20") {
					$("#canvas-source").addClass("contrast");
					$("#canvas-source").removeClass("sepia hue-rotate saturate");
		
				
				} else if (notes[r].note == "note40") {
					$("#canvas-source").addClass("hue-rotate");
					$("#canvas-source").removeClass("sepia contrast saturate");

				
				} else if (notes[r].note == "note60") {
					$("#canvas-source").removeClass("sepia hue-rotate contrast");
				}

				myVideo.play();

			}


		}

	}


})();