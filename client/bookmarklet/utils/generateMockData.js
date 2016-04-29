import seedrandom from 'seedrandom';

export default function generateMockData(numberOfItems, startValue, endValue, seed) {
	var data = [];
	var rng;
	seed = seed || location.href;
	rng = seedrandom(seed);

	numberOfItems = numberOfItems || 10;

	var stepX = 100 / numberOfItems;
	var x = 0;
	endValue = endValue || Math.floor(rng() * 10000);


	var y = startValue || Math.floor(rng() * 50000 + endValue);
	var stepY;
	for(;numberOfItems > 0; numberOfItems--) {
		data.push([x, y]);
		stepY = Math.floor(rng() * (y - endValue) / 3);
		x = x + stepX;
		y = y - stepY;
	}

	data.push([100, endValue]);

	 // console.table(data);

	return {viewersArray: data};
}