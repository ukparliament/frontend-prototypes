(function () {

	var map_container = document.getElementById('mapbox');

	if (map_container) {
		if (map_data) {
			ukp_getJsonFile(map_data, function (data) {

				// Documentation, http://leafletjs.com/reference-1.0.3.html
				//  create a map of the center of London with pretty Mapbox Streets tiles
				var map = L.map('mapbox').setView([51.513, -0.16], 13);

				// add a Map tile layer, https://www.mapbox.com/studio/
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
					maxZoom: 18,
					id: 'mapbox.light', // options: mapbox.streets || mapbox.light
					accessToken: 'pk.eyJ1IjoiaHVudHAiLCJhIjoiY2l6cXY3NjZpMDAxZzJybzF0aDBvdHRlZCJ9.k1zL5uDY7eUvuSiw3Rdrkw'
				}).addTo(map);

				geojson = L.geoJson(data).addTo(map); // Creates a GeoJSON layer

				// Iterates over the layers of the map, optionally specifying context of the iterator function
				geojson.eachLayer(function (layer) {
					layer.bindPopup(layer.feature.properties.fullname); // binds a popup to the layers
				});

			});
		}
	}

})();
