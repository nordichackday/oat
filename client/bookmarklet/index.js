import VideoOverlay from './VideoOverlay/VideoOverlay';

import getPositionAndSize from './utils/getPositionAndSize';

// player._events.time[0].context.on('time', function(a) {console.log(a);});

function initializeBookmarklet() {
	var player = document.getElementById('sarpur-player_swf_0');
	var overlay = new VideoOverlay(player);
	overlay.initialize();
	overlay.show();
}

initializeBookmarklet();
