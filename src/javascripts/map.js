/**
 * Draw Map
 */

UK_Parliament.map = function() {

  var map_container = document.getElementById('mapbox');

  if (!map_container) return false;

  var
    hasData = map_container.hasAttribute('data-json-location'),
    access_token = 'pk.eyJ1IjoiaHVudHAiLCJhIjoiY2l6cXY3NjZpMDAxZzJybzF0aDBvdHRlZCJ9.k1zL5uDY7eUvuSiw3Rdrkw',
    map,
    map_type = 'mapbox.streets',
    geojson,
    default_zoom = 5,
    max_zoom = 18,
    breakpoint = 767,
    fill_color = '#5F2DB4',
    control_position = 'bottomright',

    drawMap = function() {
      if (map_container && hasData) {
        UK_Parliament.httpRequest(map_container.getAttribute('data-json-location'), function (data) {
          map_container.classList.add('map');
          map = L.map('mapbox', {
            center: [55, -3],  // centre map around the UK
            zoom: default_zoom,
            maxZoom: max_zoom,
            scrollWheelZoom: false,
            zoomControl: false,
            detectRetina: true,
            fullscreenControl: true,
            fullscreenControlOptions: {
              position: control_position
            },
            attributionControl: false
          });

          mapTile();

          mapControl();

          mapData(data);

          mapOrientation();

          mapToggleFullscreen();


          ['pageshow', 'orientationchange', 'resize'].forEach(function (event) {
            window.addEventListener(event, mapOrientation);
          });

        });
      }
    },

    mapOrientation = function() {
      map.fitBounds(geojson.getBounds());
      (window.innerWidth >= breakpoint || map._isFullscreen) ? map.dragging.enable() : map.dragging.disable();
    },

    mapData = function(data) {
      geojson = L.geoJson(data, {
        color: fill_color,
        fillOpacity: 0.1
      }).addTo(map);
    },

    mapTile = function() {
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
        maxZoom: max_zoom,
        id: map_type,
        accessToken: access_token
      }).addTo(map);
    },

    mapControl = function() {
      // Add title to map for screen readers
      L.Control.MapTitle = L.Control.extend({
        onAdd: function() {
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

      L.control.zoom({ position: control_position }).addTo(map);
    },

    mapToggleFullscreen = function() {
      map.on('enterFullscreen', function() {
        map.fitBounds(geojson.getBounds());
        map_container.classList.add('map--icon');
        map.dragging.enable();
        map.scrollWheelZoom.enable();
      });
      map.on('exitFullscreen', function() {
        map.fitBounds(geojson.getBounds());
        map_container.classList.remove('map--icon');
        map.dragging.disable();
        map.scrollWheelZoom.disable();
      });
    };

  drawMap();
};
UK_Parliament.map();
