import getAllElementsWithAttribute from './utils/getAllElementsWithAttribute';
import getPositionAndSize from './utils/getPositionAndSize';

// player._events.time[0].context.on('time', function(a) {console.log(a);});

function createOverlay() {
	var overlay = document.createElement('DIV');
	overlay.style.position = 'absolute';
	overlay.style.zIndex = '9999999';
	overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
	overlay.style.top = pos.top + 'px';
	overlay.style.left = pos.left + 'px';
	overlay.style.width = pos.width + 'px';
	overlay.style.height = pos.height + 'px';

	var text = document.createElement('DIV');
	text.innerHTML = '57120';
	text.style.fontSize = '40px';
	text.style.color = '#FFFFFF';
	text.style.position = 'absolute';
	text.style.top = '50%';
	text.style.left = '50%';
	text.style.transform = 'translateY(-50%) translateX(-50%)';

	overlay.appendChild(text);

	document.body.appendChild(overlay);
}

function initializeBookmarklet() {
	var player = document.getElementById('sarpur-player_swf_0');
	console.log(player)
	var playerPos = getPositionAndSize(player);
	createOverlay(playerPos);
}

initializeBookmarklet();
