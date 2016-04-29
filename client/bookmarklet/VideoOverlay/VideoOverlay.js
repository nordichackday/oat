import getPositionAndSize from '../utils/getPositionAndSize';
import viewerGraph, {getMaxDataValue} from './viewerGraph';

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

function createTimebar() {
	var timeBar = document.createElement('DIV');
	timeBar.style.position = 'absolute';
	timeBar.style.height = '100%';
	var width = 4;
	timeBar.style.width = width + 'px';
	timeBar.style.backgroundColor = '#F5A623';
	timeBar.style.marginLeft = -width / 2 + 'px';
	timeBar.style.left = '0';
	timeBar.style.bottom = '0';
	timeBar.className = 'timeBar';
	timeBar.style.zIndex = '9999999999999';

	var timeball = document.createElement('div');
	var radius = 12;
	timeball.style.position = 'absolute';
	timeball.style.width = radius + 'px';
	timeball.style.height = radius + 'px';
	timeball.style.left = -(radius - width)/2 + 'px';
	timeball.style.top = -radius/2 + 'px';
	timeball.style.borderRadius = '50%';
	timeball.style.backgroundColor = '#F5A623';
	timeball.className = 'timeBall';

	timeBar.appendChild(timeball);

	return timeBar;
}

export default class VideoOverlay {
	constructor(videoElement, data) {
		this.videoElement = videoElement;
		this.videoElementPos = getPositionAndSize(videoElement);
		this.currentTimePercentage = 0;
		this.isRendering = false;
		this.data = data;
		this.maxDataValue = getMaxDataValue(this.data.viewersArray);

		this.visible = false;
	}
	initialize() {
		this.createOverlayElement();
		this.createGraphElements();
		this.overlay.appendChild(this.viewerGraph);
		this.overlay.appendChild(this.averageViewerGraph);

		document.body.appendChild(this.overlay);

		if (this.setUpChangeListener) {
			this.setUpChangeListener();
		}
	}
	show() {
		this.visible = true;
		this.isRendering = true;
		this.overlay.style.display = 'block';
		this.render();
	}
	hide() {
		this.visible = false;
		this.isRendering = false;
		this.overlay.style.display = 'none';
	}
	createGraphElements() {
		var settings = {
			height: this.videoElementPos.height,
			width: this.videoElementPos.width,
			style: {
				'position': 'absolute',
				'z-index': '99999999',
				'top': '0',
				'left': '0',
				'width': this.videoElementPos.width + 'px',
				'height': this.videoElementPos.height + 'px',
				'pointer-events': 'none',
				'overflow': 'hidden'
			}
		};
		this.viewerGraph = viewerGraph(this.data.viewersArray, settings);
		this.viewerGraph.classList.add('viewerGraph');

		// settings.lineColor = 'steelblue';
		settings.pointColor = 'transparent';
		settings.style['stroke-dasharray'] = '6';
		settings.style.opacity = '0.6';
		this.averageViewerGraph = viewerGraph(this.data.averageViewersArray, settings);
		this.averageViewerGraph.classList.add('averageViewerGraph');
	}

	createOverlayElement() {
		this.overlay = document.createElement('DIV');
		this.overlay.className = 'videoOverlay';
		this.overlay.style.overflow = 'hidden';
		this.overlay.style.display = 'none';
		this.overlay.style.position = 'absolute';
		this.overlay.style.zIndex = '9999998';
		this.overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
		this.overlay.style.top = this.videoElementPos.top + 'px';
		this.overlay.style.left = this.videoElementPos.left + 'px';
		this.overlay.style.width = this.videoElementPos.width + 'px';
		this.overlay.style.height = this.videoElementPos.height + 'px';
		this.overlay.style.pointerEvents = 'none';

		this.text = createText();
		this.timebar = createTimebar();

		this.overlay.appendChild(this.text);
		this.overlay.appendChild(this.timebar);

	}
	getViewersAtTime() {
		var lowDataPoint = this.data.viewersArray[0];
		var highDataPoint = this.data.viewersArray[this.data.viewersArray.length-1];
		var currentPercentage = this.currentTimePercentage*100;

		for (var i = 0, l = this.data.viewersArray.length; i < l; i += 1) {
			if (this.data.viewersArray[i][0] < currentPercentage &&
					this.data.viewersArray[i+1][0] > currentPercentage) {
				lowDataPoint = this.data.viewersArray[i];
				highDataPoint = this.data.viewersArray[i+1];
			}
		}

		var normalizedPercentage = currentPercentage - lowDataPoint[0];
		var normalizedHigh = highDataPoint[0] - lowDataPoint[0];

		var relativePercentage = (normalizedPercentage / normalizedHigh);
		var diff = lowDataPoint[1] - highDataPoint[1];

		var viewers = lowDataPoint[1] - (diff*relativePercentage);
		return Math.round(viewers);
	}
	updateCurrentTimePercentage() {
		this.currentTimePercentage = this.videoElement.currentTime / this.videoElement.duration;
	}
	render() {
		if (!this.setUpChangeListener) {
			this.updateCurrentTimePercentage();
		}
		var viewers = this.getViewersAtTime();
		this.text.innerHTML = viewers + ' viewers';
 		var progressInPx = (this.videoElementPos.width * this.currentTimePercentage) + 'px';
		this.timebar.style.left = progressInPx;
		this.timebar.style.height = this.videoElementPos.height * (viewers / this.maxDataValue) + 'px';
		this.viewerGraph.style.width = progressInPx;
		this.averageViewerGraph.style.width = progressInPx;


		if (this.isRendering) {
			requestAnimationFrame(this.render.bind(this));
		}
	}
}