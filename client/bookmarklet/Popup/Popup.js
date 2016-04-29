export default class Popup {
	constructor(videoOverlay, pageViewData) {
		this.videoOverlay = videoOverlay || null;
		this.pageViewData = pageViewData || null;
	}
	initialize() {
		this.createPopupElement();
		this.show();
	}
	createControllerElement(text) {
		var el = document.createElement('DIV');
		el.innerHTML = text;
		el.style.fontSize = '20px';
		el.style.color = '#F5A623';
		el.style.padding = '10px 15px';
		el.style.cursor = 'pointer';
		el.style.borderRadius = '10px';
		el.style.backgroundColor = '#000000';
		el.style.border = 'solid 1px #979797';
		el.style.position = 'relative';
		el.style.top = '-10px';
		el.style.display = 'inline-block';
		el.style.marginRight = '15px';

		el.show = () => {el.style.display = 'inline-block';};
		el.hide = () => {el.style.display = 'none';};

		return el;
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
			this.videoOverlayController = this.createControllerElement('Show video overlay');

			this.videoOverlayController.addEventListener('click', () => {
				if (this.videoOverlay.visible) {
					this.videoOverlayController.innerHTML = 'Show video overlay';
					this.videoOverlay.hide();
					this.viewerGraphsController && this.viewerGraphsController.hide();
				} else {
					this.videoOverlayController.innerHTML = 'Hide video overlay';
					this.videoOverlay.show();
					this.viewerGraphsController && this.viewerGraphsController.show();
				}
			});
			this.popupElement.appendChild(this.videoOverlayController);
		}

		if(this.videoOverlay && (this.videoOverlay.viewerGraph || this.videoOverlay.viewerGraph)) {
			let overflow = 'hidden';
			this.viewerGraphsController = this.createControllerElement('Show full graph');

			this.viewerGraphsController.addEventListener('click', () => {
				if (overflow === 'hidden') {
					this.viewerGraphsController.innerHTML = 'Show full graph';
					overflow = '';
				} else {
					this.viewerGraphsController.innerHTML = 'Show current graph';
					overflow = 'hidden';
				}

				if(this.videoOverlay.viewerGraph) {
					this.videoOverlay.viewerGraph.style.overflow = overflow;
				}
				if(this.videoOverlay.averageViewerGraph) {
					this.videoOverlay.averageViewerGraph.style.overflow = overflow;
				}
			});

			this.viewerGraphsController.hide();
			this.popupElement.appendChild(this.viewerGraphsController);

		}

		document.body.appendChild(this.popupElement);
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
		pvpContainer.style.marginBottom = '30px';

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