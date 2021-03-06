import VideoOverlay from '../VideoOverlay/VideoOverlay';

export default class VideoOverlayRUV extends VideoOverlay {
	constructor(videoElement, data) {
		super(videoElement, data);
	}
	setUpChangeListener() {
		this.videoElement._events.time[0].context.on('time', (timeObj) => {
			this.currentTimePercentage = timeObj.position / timeObj.duration;
		});
	}
}
