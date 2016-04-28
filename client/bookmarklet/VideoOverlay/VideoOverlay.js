import getPositionAndSize from '../utils/getPositionAndSize';

function createText() {
	var text = document.createElement('DIV');
	text.innerHTML = '57120';
	text.style.fontSize = '40px';
	text.style.color = '#FFFFFF';
	text.style.position = 'absolute';
	text.style.top = '50%';
	text.style.left = '50%';
	text.style.transform = 'translateY(-50%) translateX(-50%)';

	return text;
}

export default class VideoOverlay {
	constructor(videoElement, data) {
		this.videoElement = videoElement;
		this.videoElementPos = getPositionAndSize(videoElement);
		this.currentTimePercentage = 0;
		this.isRendering = false;
		this.data = data;
	}
	initialize() {
		this.createOverlayElement();
		document.body.appendChild(this.overlay);

		this.videoElement._events.time[0].context.on('time', (timeObj) => {
			this.currentTimePercentage = timeObj.position / timeObj.duration;
		});
	}
	show() {
		this.isRendering = true;
		this.overlay.style.display = 'block';
		this.render();
	}
	hide() {
		this.isRendering = false;
		this.overlay.style.display = 'none';
	}
	createOverlayElement() {
		this.overlay = document.createElement('DIV');
		this.overlay.style.display = 'none';
		this.overlay.style.position = 'absolute';
		this.overlay.style.zIndex = '9999999';
		this.overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
		this.overlay.style.top = this.videoElementPos.top + 'px';
		this.overlay.style.left = this.videoElementPos.left + 'px';
		this.overlay.style.width = this.videoElementPos.width + 'px';
		this.overlay.style.height = this.videoElementPos.height + 'px';

		this.text = createText();

		this.overlay.appendChild(this.text);
	}
	getVisitorsAtTime() {
		var lowDataPoint = this.data.visitorsArray[0];
		var highDataPoint = this.data.visitorsArray[this.data.visitorsArray.length-1];
		var currentPercentage = this.currentTimePercentage*100;

		for (var i = 0, l = this.data.visitorsArray.length; i < l; i += 1) {
			if (this.data.visitorsArray[i][0] < currentPercentage &&
					this.data.visitorsArray[i+1][0] > currentPercentage) {
				lowDataPoint = this.data.visitorsArray[i];
				highDataPoint = this.data.visitorsArray[i+1];
			}
		}

		var normalizedPercentage = currentPercentage - lowDataPoint[0];
		var normalizedHigh = highDataPoint[0] - lowDataPoint[0];

		var relativePercentage = (normalizedPercentage / normalizedHigh);
		var diff = lowDataPoint[1] - highDataPoint[1];

		var visitors = lowDataPoint[1] - (diff*relativePercentage);
		return Math.round(visitors);
	}
	render() {
		var visitors = this.getVisitorsAtTime();
		this.text.innerHTML = visitors + ' visitors';

		if (this.isRendering) {
			requestAnimationFrame(this.render.bind(this));
		}
	}
}