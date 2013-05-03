if(navigator.webkitGetUserMedia!=null) { 
	var options = { 
        video:true, 
        audio:true 
    };
	
	navigator.webkitGetUserMedia(options, 
        function(stream) { 
            var video = document.querySelector('video'); 
            video.src = window.webkitURL.createObjectURL(stream); 
        }, 
        
    ); 
		
}