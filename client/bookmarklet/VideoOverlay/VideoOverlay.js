import getPositionAndSize from '../utils/getPositionAndSize';

function createText() {
	var text = document.createElement('DIV');
	text.innerHTML = '57120';
	text.style.fontSize = '40px';
	text.style.color = '#FFFFFF';
	text.style.position = 'absolute';
	text.style.top = '10px';
	text.style.right = '20px';

	return text;
}

function createTimeline() {
	var timeline = document.createElement('DIV');
	timeline.style.position = 'absolute';
	timeline.style.height = '100%';
	timeline.style.width = '4px';
	timeline.style.backgroundColor = '#F5A623';
	timeline.style.left = '0';
	timeline.style.top = '0';

	return timeline;
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

		if (this.setUpChangeListener) {
			this.setUpChangeListener();
		}
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
		this.overlay.style.pointerEvents = 'none';

		this.text = createText();
		this.timeline = createTimeline();

		this.overlay.appendChild(this.text);
		this.overlay.appendChild(this.timeline);
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
	updateCurrentTimePercentage() {
		this.currentTimePercentage = this.videoElement.currentTime / this.videoElement.duration;
	}
	render() {
		if (!this.setUpChangeListener) {
			this.updateCurrentTimePercentage();
		}
		var visitors = this.getVisitorsAtTime();
		this.text.innerHTML = visitors + ' visitors';

		this.timeline.style.left = (this.videoElementPos.width * this.currentTimePercentage) + 'px';

		if (this.isRendering) {
			requestAnimationFrame(this.render.bind(this));
		}
	}
}