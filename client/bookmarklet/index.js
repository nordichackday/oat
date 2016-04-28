import StandardVideoOverlay from './VideoOverlay/VideoOverlay';

import VideoOverlayRUV from './RUV/VideoOverlayRUV';
import getVideoElementRUV from './RUV/getVideoElementRUV';

import getVideoElementSVT from './SVT/getVideoElementSVT';

import getPositionAndSize from './utils/getPositionAndSize';

const mockData = {
	visitorsArray: [
		[0, 50123],
		[20, 40543],
		[40, 35000],
		[60, 30000],
		[80, 20000],
		[100, 15000]
	]
};

function initializeBookmarklet() {
	var getVideoElement;
	var VideoOverlay;
	if (location.hostname.toLowerCase().indexOf('ruv.is') > -1) {
		getVideoElement = getVideoElementRUV;
		VideoOverlay = VideoOverlayRUV;
	} else {//if (location.hostname.toLowerCase().indexOf('svt.se') > -1 ||
					//	 location.hostname.toLowerCase().indexOf('svtplay.se') > -1) {
		getVideoElement = getVideoElementSVT;
		VideoOverlay = StandardVideoOverlay;
	}

	var player = getVideoElement();
	var overlay = new VideoOverlay(player, mockData);
	overlay.initialize();
	overlay.show();
}

initializeBookmarklet();
