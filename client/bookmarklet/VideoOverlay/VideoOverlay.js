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
	constructor(videoElement) {
		this.videoElement = videoElement;
		this.videoElementPos = getPositionAndSize(videoElement);
	}
	initialize() {
		this.createOverlayElement();
		document.body.appendChild(this.overlay);
	}
	show() {
		this.overlay.style.display = 'block';
	}
	hide() {
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

		var text = createText();

		this.overlay.appendChild(text);
	}
}