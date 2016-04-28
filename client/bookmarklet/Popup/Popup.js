export default class Popup {
	constructor(videoOverlay) {
		this.videoOverlay = videoOverlay;
	}
	initialize() {
		this.createPopupElement();
		this.show();
	}
	createPopupElement() {
		this.popupElement = document.createElement('DIV');
		this.popupElement.style.display = 'none';
		this.popupElement.style.position = 'fixed';
		this.popupElement.style.bottom = '15px';
		this.popupElement.style.left = '20px';
		this.popupElement.style.borderRadius = '10px';
		this.popupElement.style.backgroundColor = '#979797';

		this.videoOverlayController = document.createElement('DIV');
		this.videoOverlayController.innerHTML = 'Show video overlay';
		this.videoOverlayController.style.fontSize = '20px';
		this.videoOverlayController.style.color = '#F5A623';
		this.videoOverlayController.style.padding = '10px 15px';

		this.popupElement.appendChild(this.videoOverlayController);
		document.body.appendChild(this.popupElement);
	}
	show() {
		this.popupElement.style.display = 'block';
	}
	hide() {
		this.popupElement.style.display = 'none';
	}
}