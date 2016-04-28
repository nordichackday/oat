export default function getPositionAndSize(element) {
	var top = 0, left = 0;
	do {
		top += element.offsetTop || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while(element);

	return {
		top: top,
		left: left,
		width: element.offsetWidth,
		height: element.offsetHeight
	};
};