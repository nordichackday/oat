(function() {
	window.OATAPI = '';
	var oatScript=document.createElement('SCRIPT');
	oatScript.type='text/javascript';
	oatScript.src='http://localhost:9000/bookmarklet/dist/oat-loader.js';
	document.getElementsByTagName('head')[0].appendChild(oatScript);
})();
