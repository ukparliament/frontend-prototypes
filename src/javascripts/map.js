(function() {

	/**
	 * WIP
	 */
	var mymap = L.map('mapbox').setView([51.505, -0.09], 10);
	L.tileLayer(
		'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			id: 'mapbox.streets'
		}).addTo(mymap);
	geojson = L.geoJson(theData).addTo(mymap);
	geojson.eachLayer(function(layer) {
		layer.bindPopup(layer.feature.properties.name);
	});

})();
