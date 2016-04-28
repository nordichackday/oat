export default function getPositionAndSize(originalElement) {
	var currentElement = originalElement;
	var top = 0, left = 0;
	do {
		top += currentElement.offsetTop || 0;
		left += currentElement.offsetLeft || 0;
		currentElement = currentElement.offsetParent;
	} while(currentElement);

	return {
		top: top,
		left: left,
		width: originalElement.offsetWidth,
		height: originalElement.offsetHeight
	};
};