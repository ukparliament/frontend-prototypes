// Setting the Map

UK_Parliament.map = function() {

  // Local variables
  var
    map_container = document.getElementById('mapbox'),
    map,
    geojson,
    breakpoint = '767',
    mapBreakPointOptions = function() {
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
    };

  if (map_container && map_container.hasAttribute('data-json-location')) {

    this.httpRequest(map_container.getAttribute('data-json-location'), function (data) {

      // Add class if we have valid data
      map_container.classList.add('map');

      // Create the map
      map = L.map('mapbox', {
        center: [55, -3], // Centre map around the UK

        zoom: 5, // Default zoom
        maxZoom: 18, // Max zoom level
        scrollWheelZoom: false, // Disable mouse wheel zoom
        zoomControl: false, // Disable zoom control

        attributionControl: false // Disable 'Leaflet' attribution
      });

      // Control
      // http://leafletjs.com/reference-1.2.0.html#control
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      // Setup the map tile layer
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaHVudHAiLCJhIjoiY2l6cXY3NjZpMDAxZzJybzF0aDBvdHRlZCJ9.k1zL5uDY7eUvuSiw3Rdrkw'
      }).addTo(map);

      // Create the GeoJSON layer
      geojson = L.geoJson(data, {
        color: '#5F2DB4',
        fillOpacity: 0.1
      }).addTo(map);

      mapBreakPointOptions();

      // Event listener for device rotation and resize changes
      ['orientationchange', 'resize'].forEach(function (event) {
        window.addEventListener(event, mapBreakPointOptions, false);
      });

    });
  }
};

UK_Parliament.map();
