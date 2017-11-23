// Setting the Map

UK_Parliament.map = function() {

  // Local variables
  var
    map_container = document.getElementById('mapbox'),

    map,
    geojson,
    breakpoint = '767',
    control_position = 'bottomright',

    mapBreakPointOptions = function() {
      /**
       * Map options based on browser width or fullscreen
       * Toggle map dragging
       * Always fit location within the map boundary
       */

      map.fitBounds(geojson.getBounds());

      if (window.innerWidth >= breakpoint || map._isFullscreen) {
        map.dragging.enable();
      } else {
        map.dragging.disable();
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
        scrollWheelZoom: false,
        zoomControl: false, // Disable zoom control

        detectRetina: true,

        fullscreenControl: true,
        fullscreenControlOptions: {
          position: control_position
        },

        attributionControl: false // Disable 'Leaflet' attribution
      });

      // Control
      // http://leafletjs.com/reference-1.2.0.html#control
      L.control.zoom({
        position: control_position
      }).addTo(map);

      // Setup the map tile layer
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaHVudHAiLCJhIjoiY2l6cXY3NjZpMDAxZzJybzF0aDBvdHRlZCJ9.k1zL5uDY7eUvuSiw3Rdrkw'
      }).addTo(map);

      // Adding title to map for screen readers
      L.Control.MapTitle = L.Control.extend({
        onAdd: function(map) {
          var
            map_title = map_container.getAttribute('data-map-title'),
            map_title_container = L.DomUtil.create('h3');

          map_title_container.className = 'sr-only';
          map_title_container.innerHTML = map_title;
          map_title_container.setAttribute('aria-labelledby', map_title);

          return map_title_container;
        }
      });

      L.control.mapTitle = function(opts) {
        return new L.Control.MapTitle(opts);
      };

      L.control.mapTitle({ position: 'topleft' }).addTo(map);

      // Create the GeoJSON layer
      geojson = L.geoJson(data, {
        color: '#5F2DB4',
        fillOpacity: 0.1
      }).addTo(map);

      // events are fired when entering or exiting fullscreen.
      map.on('enterFullscreen', function () {
        map.fitBounds(geojson.getBounds());
        map_container.classList.add('map--icon');
        map.dragging.enable();
        map.scrollWheelZoom.enable();
      });
      map.on('exitFullscreen', function () {
        map.fitBounds(geojson.getBounds());
        map_container.classList.remove('map--icon');
        map.dragging.disable();
        map.scrollWheelZoom.disable();
      });

      mapBreakPointOptions();

      // Event listener for device rotation and resize changes
      ['pageshow', 'orientationchange', 'resize'].forEach(function (event) {
        window.addEventListener(event, mapBreakPointOptions, false);
      });

    });
  }
};

UK_Parliament.map();
