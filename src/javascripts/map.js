
(function () {

	var map_container = document.getElementById('mapbox'),
		map_data = window.location + '.json',
		map,
		geojson,
		breakpoint = '767';

	if (map_container) {
		ukp_getJsonFile(map_data, function (data) {

			// Add class if we have valid data
			map_container.classList.add('map');

			// Create the map
			map = L.map('mapbox').setView([55, -3], 6);

			// Setup the map tile layer
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				maxZoom: 18,
				id: 'mapbox.light',
				accessToken: 'pk.eyJ1IjoiaHVudHAiLCJhIjoiY2l6cXY3NjZpMDAxZzJybzF0aDBvdHRlZCJ9.k1zL5uDY7eUvuSiw3Rdrkw'
			}).addTo(map);

			// Create the GeoJSON layer
			geojson = L.geoJson(data, {
				color: '#5F2DB4',
				fillOpacity: 0.1
			}).addTo(map);

			ukp_mapBreakPointOptions();

			// Event listener for device rotation and resize changes
			['orientationchange', 'resize'].forEach(function (event) {
				window.addEventListener(event, ukp_mapBreakPointOptions, false);
			});

		});
	}

	function ukp_mapBreakPointOptions() {
		/**
		 * Map options based on browser width
		 * Toggle map dragging
		 * Always fit location within the map boundary
		 */
		if (window.innerWidth <= breakpoint) {
			map.dragging.disable();
			map.fitBounds(geojson.getBounds());
		} else {
			map.dragging.enable();
			map.fitBounds(geojson.getBounds());
		}
	}

})();
