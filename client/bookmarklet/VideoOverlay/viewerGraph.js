function getMaxDataValue(data) {
	return data.reduce(function (acc, curr) {
		var currY = curr[1];
		if (currY > acc) {
			return currY;
		}
		return acc;
	}, 0);
}

function arrayToPoint(array) {
	return {
		x: array[0],
		y: array[1]
	};
}

export default function createGraph(data, opts) {
	opts = opts || {};

	var width = opts.width || 700;
	var height = opts.height || 300;
	var margin = opts.margin || {};
	margin.left = margin.left || 0;
	margin.right = margin.right || 0;
	margin.top = margin.top || 0;
	margin.bottom = margin.bottom || 0;
	var style = opts.style || {};
	var lineColor = opts.lineColor || '#979797';
	var pointColor = opts.pointColor || '#D8D8D8';


	var graph = d3.select(document.createElement('div'))
		.append("svg")
		.remove()
		.attr("width", width)
		.attr("height", height)
		.attr("class", "viewerGraph")
		.attr("xmlns", "http://www.w3.org/2000/svg");

	Object.keys(style).forEach(function (styleRule) {
		graph.style(styleRule, style[styleRule]);
	});

	if(!data) {
		return graph.node();
	}

	var dataPoints = data.map(arrayToPoint);

	var max = getMaxDataValue(data);
	var scaleX = d3.scale.linear().domain([0, 100]).range([margin.left, width - margin.right]);
	var scaleY = d3.scale.linear().domain([0, max]).range([height - margin.top, margin.bottom]);

	var xMap = function(dataPoint) { return scaleX(dataPoint.x);};
	var yMap = function(dataPoint) { return scaleY(dataPoint.y);};

	var line = d3.svg.line()
		.interpolate("linear")
		.x(xMap)
		.y(yMap);

	graph.append("path")
		.attr("d", line(dataPoints))
		.attr("stroke", lineColor)
		.attr("stroke-width", "3")
		.attr("fill", "transparent");

	graph
		.selectAll("circle")
		.data(dataPoints)
		.enter().append("circle")
		.attr("r", 4)
		.attr("cx", xMap)
		.attr("cy", yMap)
		.attr("stroke-width", "2")
		.attr('stroke', pointColor)
		.attr('fill', pointColor);

	return graph.node();

}