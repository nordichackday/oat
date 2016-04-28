import VideoOverlayRUV from './RUV/VideoOverlayRUV';
import getVideoElementRUV from './RUV/getVideoElementRUV';

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
	var getVideoElement;
	var VideoOverlay;
	if (location.hostname.toLowerCase().indexOf('ruv.is') > -1) {
		getVideoElement = getVideoElementRUV;
		VideoOverlay = VideoOverlayRUV;
	}

	var player = getVideoElement();
	var overlay = new VideoOverlay(player, mockData);
	overlay.initialize();
	overlay.show();
}

initializeBookmarklet();
