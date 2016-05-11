$(document).ready(function() {

  var map = L.map('map').setView([38.7643916,-76.8932816], 10);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 18
  }).addTo(map);

  var wreckClickLayer = L.geoJson(null);
  var wreckRadiusClickLayer = L.geoJson(null);
    
  var wreckPointToLayer = function(feature, latlng) {
    var wreckMarker1 = L.circle(latlng, 400, {
        weight: 0.3,
        opacity: 1,
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.8
      });
      return wreckMarker1;
    };
     
  var wreckClickPointToLayer = function(feature, latlng) {
    var wreckMarker2 = L.circle(latlng, 400, {
      weight: 1,
      opacity: 1,
      color: 'black',
      fillColor: 'yellow',
      fillOpacity: 0.8
    });
    return wreckMarker2;
  };

  var radiusStyle = { 
      stroke: false,
      fill: true,
      fillColor: 'grey',
      fillOpacity: 0.02
  };


// LOAD BASE DATA

  var url1 = 'https://sgoodwin.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT * FROM chesapeake',
    format: 'GeoJSON'
  });

  $.getJSON(url1).done(function(data){
  var wreckLayer = L.geoJson(data, {
    pointToLayer: wreckPointToLayer
    });
  wreckLayer.addTo(map);
  });

// CLICK TO CHANGE DATA REPRESENTATION
    
  map.on('click', function(e){

    var clicklat = e.latlng.lat;
    var clicklng = e.latlng.lng;

    var url2 = 'https://sgoodwin.cartodb.com/api/v2/sql?' + $.param({
      q: 'SELECT * FROM chesapeake WHERE ST_DWithin(the_geom_webmercator, ST_Transform(CDB_LatLng(' + clicklat + ',' + clicklng + '), 3857), 5000)',  
      format: 'GeoJSON'
    });
    
    var url3 = 'https://sgoodwin.cartodb.com/api/v2/sql?' + $.param({
      q: 'SELECT ST_Transform(ST_Buffer(ST_Transform(CDB_LatLng(' + clicklat + ',' + clicklng + '), 3857), 5000), 4236) AS the_geom FROM chesapeake',  
      format: 'GeoJSON'
    });
    
    map.removeLayer(wreckClickLayer);
    map.removeLayer(wreckRadiusClickLayer);
    
    $.getJSON(url2).done(function(data){
      wreckClickLayer = L.geoJson(data, {
        pointToLayer: wreckClickPointToLayer 
      });
    });
    
    $.getJSON(url3).done(function(data){
      wreckRadiusClickLayer = L.geoJson(data, {
        style: radiusStyle
      });
      map.addLayer(wreckRadiusClickLayer);
      map.addLayer(wreckClickLayer);
    });
    
  });

});
  