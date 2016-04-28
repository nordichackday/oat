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

class Oat {
	constructor() {
		this.setupForHost(location.hostname.toLowerCase());
	}
	setupForHost(host) {
		if (host.indexOf('ruv.is') > -1) {
			this.getVideoElement = getVideoElementRUV;
			this.VideoOverlay = VideoOverlayRUV;
		} else if (host.indexOf('svt.se') > -1 ||
							 host.indexOf('svtplay.se') > -1) {
			this.getVideoElement = getVideoElementSVT;
			this.VideoOverlay = StandardVideoOverlay;
		}
	}
	initialize() {
		this.initializeVideoOverlay();
	}
	initializeVideoOverlay() {
		var player = this.getVideoElement();
		this.overlay = new this.VideoOverlay(player, mockData);
		this.overlay.initialize();
		this.overlay.show();
	}
}

var oat = new Oat();
oat.initialize();
