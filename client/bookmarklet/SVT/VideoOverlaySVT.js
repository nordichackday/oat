import VideoOverlay from '../VideoOverlay/VideoOverlay';

export default class VideoOverlayRUV extends VideoOverlay {
	constructor(videoElement, data) {
		super(videoElement, data);
	}
	setUpChangeListener() {

		setInterval(() => {
			this.currentTimePercentage = this.videoElement.currentTime / this.videoElement.duration;
		}, 50);
	}
}
