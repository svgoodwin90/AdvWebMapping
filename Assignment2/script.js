$(document).ready(function () {
	var map = L.map('map').setView([40.731649, -73.977816], 11);
	var dataLayer;


	L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', 
	{	
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		maxZoom: 19
	}).addTo(map);

	var uberPointToLayer = function (feature, latlng){
        var uberMarker = L.circle(latlng, 30, {
            stroke: false,
            fillColor: '#2ca25f',
            fillOpacity: 0.8
        });
        return uberMarker;  
    }

	var url = 'https://sgoodwin.cartodb.com/api/v2/sql?'+ $.param({
			q: 'SELECT * FROM ubernightmay18',
				format: 'GeoJSON'
		});
		$.getJSON(url)

	.done(function (data) {
		dataLayer = L.geoJson(data, {
			pointToLayer: uberPointToLayer
		}).addTo(map);
	});

	$('.base').change(function () {
	var url = 'https://sgoodwin.cartodb.com/api/v2/sql?'+ $.param({
			q: 'SELECT * FROM ubernightmay18 WHERE Base =' + 
			$(this).val(),
				format: 'GeoJSON'
		});
		$.getJSON(url)

		.done(function (data){
			dataLayer.clearLayers();
			dataLayer.addData(data);
		});
	});
});