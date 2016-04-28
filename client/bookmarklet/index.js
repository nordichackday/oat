import Popup from './Popup/Popup';

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
	constructor(host) {
		this.setupForHost(host);
		var player = this.getVideoElement();
		this.videoOverlay = new this.VideoOverlay(player, mockData);
		this.popup = new Popup(this.videoOverlay);
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
		this.initializePopup();
	}
	initializeVideoOverlay() {
		this.videoOverlay.initialize();
	}
	initializePopup() {
		this.popup.initialize();
		this.popup.show();
	}
}

var d3=document.createElement('SCRIPT');
d3.type='text/javascript';
d3.src='https://d3js.org/d3.v3.min.js';
document.getElementsByTagName('head')[0].appendChild(d3);

d3.onload = function () {
	var oat = new Oat(location.hostname.toLowerCase());
	oat.initialize();
};