export default class Popup {
	constructor(videoOverlay, pageViewData) {
		this.videoOverlay = videoOverlay || null;
		this.pageViewData = pageViewData || null;
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
		this.popupElement.style.zIndex = '9999999';

		if (this.pageViewData) {
			this.pageViewPopup = this.createPageViewPopup();
			this.popupElement.appendChild(this.pageViewPopup);
		}

		if (this.videoOverlay) {
			this.videoOverlayController = this.createVideoOverlayController();
			this.popupElement.appendChild(this.videoOverlayController);
		}

		document.body.appendChild(this.popupElement);
	}
	createVideoOverlayController() {
		var voc = document.createElement('SPAN');
		voc.innerHTML = 'Show video overlay';
		voc.style.fontSize = '20px';
		voc.style.color = '#F5A623';
		voc.style.padding = '10px 15px';
		voc.style.cursor = 'pointer';
		voc.style.borderRadius = '10px';
		voc.style.backgroundColor = '#000000';
		voc.style.border = 'solid 1px #979797';

		voc.addEventListener('click', () => {
			if (this.videoOverlay.visible) {
				this.videoOverlayController.innerHTML = 'Show video overlay';
				this.videoOverlay.hide();
			} else {
				this.videoOverlayController.innerHTML = 'Hide video overlay';
				this.videoOverlay.show();
			}
		});
		return voc;
	}
	createPageViewPopup() {
		var pvpContainer = document.createElement('DIV');
		pvpContainer.style.fontSize = '20px';
		pvpContainer.style.color = '#979797';
		pvpContainer.style.padding = '10px 15px';
		pvpContainer.style.borderRadius = '10px';
		pvpContainer.style.backgroundColor = '#000000';
		pvpContainer.style.border = 'solid 1px #979797';
		pvpContainer.style.height = '80px';

		var span1 = this.createPageViewPopupSpan(this.pageViewData.sessions, this.pageViewData.users);
		var span2 = this.createPageViewPopupSpan(this.pageViewData.pageviews, this.pageViewData.pageViewsPerSession);
		var span3 = this.createPageViewPopupSpan(this.pageViewData.avgSessionDuration, this.pageViewData.bounceRate);

		pvpContainer.appendChild(span1);
		pvpContainer.appendChild(span2);
		pvpContainer.appendChild(span3);

		return pvpContainer;
	}
	createPageViewPopupSpan(item1, item2) {
		var span = document.createElement('SPAN');
		span.style.display = 'inline-block';
		span.style.width = ((window.innerWidth/3)-40) + 'px';
		span.style.float = 'left';

		var item1El = document.createElement('DIV');
		item1El.innerHTML = this.createPageViewItemString(item1);

		var item2El = document.createElement('DIV');
		item2El.innerHTML = this.createPageViewItemString(item2);

		span.appendChild(item1El);
		span.appendChild(item2El);

		return span;
	}
	createPageViewItemString(item) {
		var str = `${item.label}: `;
		str += `<span style="color: #fff;">${item.value}</span>`;
		return str;
	}
	show() {
		this.popupElement.style.display = 'block';
	}
	hide() {
		this.popupElement.style.display = 'none';
	}
}