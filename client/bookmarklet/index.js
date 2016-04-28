import VideoOverlay from './VideoOverlay/VideoOverlay';

import getPositionAndSize from './utils/getPositionAndSize';

const mockData = {
	visitorsArray: [
		[0, 50123],
		[20, 40543],
		[40, 35000],
		[60, 30000],
		[80, 20000],
		[100, 20000]
	]
};

function initializeBookmarklet() {
	var player = document.getElementById('sarpur-player_swf_0');
	var overlay = new VideoOverlay(player, mockData);
	overlay.initialize();
	overlay.show();
}

initializeBookmarklet();
