# APPLES



## Project Overview

**Overview**

For this project, I'm going to detect webcam gesture using HTML5 Video and Canvas. On succesful detection, a CSS3 animation will play.

**Origin Story - you don't have to read this**

This idea originally came from apples. I was thinking of a simple way to detect when an apple is grabbed from SL's dining table, and somehow playing an animation saying "yay, you're being healthy today!" I initially thought of a couple ideas like - using weight detection on an iPad (meh), or just simply clicking a button on an iPhone whenever you grab an apple, but as we all know, clicking is a bit clichéd. Then I remembered Bos' [mailman talk](http://wesbos.com/talks/fitc/#17) and decided emulate that. Basically, he showed a demo of how he captured gesture using his phone, used canvas to compare pixels and WebRTC to talk to his desktop! COOLIO. But... I wanna learn CSS3 too! So I thought I could do a simple CSS3 animation or rotation or something when its successfully detected. Hooray.

**Inspirations**

+ HTML5 and Canvas: I found out about this from one of Wes Bos' talk regarding [Hardware Access and Device APIs with JavaScript and HTML5](http://wesbos.com/talks/fitc/#17) and have always wanted to give it a try. 
+ CSS3: [http://codepen.io/fixcl/pen/AtdvG](http://codepen.io/fixcl/pen/AtdvG), [http://codepen.io/jkneb/pen/feCvg](http://codepen.io/jkneb/pen/feCvg), [http://secretrobotron.github.io/breaking-the-box/](http://secretrobotron.github.io/breaking-the-box/)



## Goals

* Learn as much new CSS3 features as I can (transform, transition, animation, etc.)
* Learn CSS3's limitations and capabilities
* Take advantage of GPU acceleration with CSS3 hacks
* Get to know Canvas and some of the things it can do
* Lean more about HTML5 videos
* Be more familiar with Github
* Share final product and do a post about it
* Relax and have fun. :)



## What is Innovative
* CSS is continually growing and it's amazing to see what it can do now
* Using the webcam has been restricted to Flash for the longest time, and its very interesting to know that HTML5 and javaScript can do that now too. 



## Author
* [Joanna Ong](https://twitter.com/leethelobster)



## Credits
* Secret Location, Ryan Andal



## References
**Links**
* [Capturing Audio & Video in HTML5 - getUserMedia() API](http://www.html5rocks.com/en/tutorials/getusermedia/intro/)
* http://www.8bitrocket.com/2013/01/25/html5-canvas-web-cam-chrome-html5-video-puzzle-of-you-demo/
* http://www.webdesignermag.co.uk/tutorials/capture-webcam-video-with-html5/
* http://www.soundstep.com/blog/2012/03/22/javascript-motion-detection/
* http://www.adobe.com/devnet/html5/articles/javascript-motion-detection.html
* http://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css
* http://www.w3schools.com/tags/ref_canvas.asp

**Canvas methods used (from W3C)**
+ The getImageData() method returns an ImageData object that copies the pixel data for the specified rectangle on a canvas.
+ The drawImage() method draws an image, canvas, or video onto the canvas.
+ The createImageData() method creates a new, blank ImageData object. The new object's pixel values are transparent black by default.
+ The putImageData() method puts the image data (from a specified ImageData object) back onto the canvas.

===========

## What were you able to accomplish from your original goals?
* 75% -- Learn as much new CSS3 features as I can (transform, transition, animation, etc.)
* 75% -- Learn CSS3's limitations and capabilities
* YAY! -- Take advantage of GPU acceleration with CSS3 hacks
* YAY, in terms of drawing from video -- Get to know Canvas and some of the things it can do
* YUP! -- Lean more about HTML5 videos
* YUP! -- Be more familiar with Github
* TODO! -- Share final product and do a post about it
* YAY! -- Relax and have fun. :)


## What did you learn?
* getUserMedia - accessing webcam using HTML
* HTML to canvas


## How could we use this learning on projects moving forward?
* Accessing webcam could be done using HTML and JS!
* Drawing to canvas is pretty sweet - just because its just another HTML element and you can apply cool CSS tricks with it such as opacity, filters, animations, etc.
* CSS animations is easy to understand