// Utility functions

// useful for finding elements (a shortcut for getElementById)
var myElement = function(id) { 
	return document.getElementById(id); 
};

// video player controls
$(function() {
   
    // stop if HTML5 Video is not supported
    if (!document.createElement('video').canPlayType) {
        $('#videoControls').hide();
        return;
    }
    
    // capture the video element in a variable
    var myVideo = myElement('myVideo');
    
    // the play/pause toggle button
    $('#playButton').bind('click', function() {
        // if current state is paused
        if (myVideo.paused) {
            // play the video and change button text
            myVideo.play();
            $(this).html('Pause');
        } else {
            // else pause the video and change button text
            myVideo.pause();
            $(this).html('Play');
        }
    });
    
    // calculate and adjust the play progress bar
    $(myVideo).bind('timeupdate', function() {
        // calculate current percentage of video that has been played
        var playPercent = this.currentTime / this.duration * 100;
        // set the css width of the bar to this percentage
        $('#playProgress').css( { width: playPercent + '%' } );        
    });
    
    
    // calculate and adjust the load progress bar within a function
    function updateLoadProgress() {
        if (myVideo.buffered.length > 0) {
            // look up the end in seconds of the first buffer in the list
            // then divide that by the total duration
            var loadPercent = myVideo.buffered.end(0) / myVideo.duration * 100;
            // set the css width
            $('#loadProgress').css( { width: loadPercent + '%' } );
        }                 
    }
    
    // there could be multiple events called for calculating the load progress
    $(myVideo).bind('progress', function() {
        updateLoadProgress();
    });
    $(myVideo).bind('loadeddata', function() {
        updateLoadProgress();
    });
    $(myVideo).bind('canplaythrough', function() {
        updateLoadProgress();
    });
    $(myVideo).bind('playing', function() {
        updateLoadProgress();
    });
    
    // format time in 00:00 format
    function formatTime(mySeconds) {
        var secs = Math.round(mySeconds);
        var mins = Math.floor(mySeconds / 60);
        // Remaining seconds
        secs = Math.floor(secs % 60);
        // Add leading Zeros
        mins = (mins >= 10) ? mins : "0" + mins;
        secs = (secs >= 10) ? secs : "0" + secs;
        return mins + ":" + secs;
    }
    
    // update the current time display
    $(myVideo).bind('timeupdate', function() {
        $('#currentTime').html(formatTime(this.currentTime));
    });
    $(myVideo).bind('durationchange', function() {
        $('#totalTime').html(formatTime(this.duration));
    });
    
});