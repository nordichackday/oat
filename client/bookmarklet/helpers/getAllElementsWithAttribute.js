function getAllElementsWithAttribute(attribute) {
	var matchingElements = [];
	var allElements = document.getElementsByTagName('*');
	for (var i = 0, n = allElements.length; i < n; i++) {
		if (allElements[i].getAttribute(attribute) !== null) {
			matchingElements.push(allElements[i]);
		}
	}
	return matchingElements;
}