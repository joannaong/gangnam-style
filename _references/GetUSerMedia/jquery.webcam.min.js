/*
 jQuery webcam plugin v1.0 09/12/2010
 http://www.xarg.org/project/jquery-webcam-plugin/

 Copyright (c) 2010, Robert Eisele (robert@xarg.org)
 Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(e){var a={extern:null,append:!0,width:320,height:240,mode:"callback",swffile:"jscam.swf",quality:85,debug:function(){},onCapture:function(){},onTick:function(){},onSave:function(){},onLoad:function(){}};window.webcam=a;e.fn.webcam=function(b){if("object"===typeof b)for(var d in a)void 0!==b[d]&&(a[d]=b[d]);b='<object id="XwebcamXobjectX" type="application/x-shockwave-flash" data="'+a.swffile+'" width="'+a.width+'" height="'+a.height+'"><param name="movie" value="'+a.swffile+'" /><param name="FlashVars" value="mode='+
a.mode+"&amp;quality="+a.quality+'" /><param name="allowScriptAccess" value="always" /></object>';if(null!==a.extern)e(a.extern)[a.append?"append":"html"](b);else this[a.append?"append":"html"](b);(_register=function(b){var c=document.getElementById("XwebcamXobjectX");void 0!==c.capture?(a.capture=function(a){try{return c.capture(a)}catch(b){}},a.save=function(a){try{return c.save(a)}catch(b){}},a.setCamera=function(a){try{return c.setCamera(a)}catch(b){}},a.getCameraList=function(){try{return c.getCameraList()}catch(a){}},
a.onLoad()):0==b?a.debug("error","Flash movie not yet registered!"):window.setTimeout(_register,1E3*(4-b),b-1)})(3)}})(jQuery);