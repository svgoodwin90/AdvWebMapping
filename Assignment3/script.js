$(document).ready(function() {
	var map = L.map('map').setView([40.7362116,-74.026156], 12);

	L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		maxZoom: 19
	}).addTo(map);

	var uberPointToLayer = function(feature, latlng) {
		var uberMarker = L.circle(latlng, 100, {
			stroke: false,
			fillColor: '#2ca25f',
			fillOpacity: 0.8
		});
		return uberMarker;
	};

	var getInterval = function(data) {
		return {
			start: data.properties.date,
			end: data.properties.date + 1000
		};
	};

	var formatOutput = function(date) {
		var theDate = new Date(date * 1000);
		dateString = theDate.toGMTString();
		return dateString.substring(0, 25);
	}

	var url = 'https://sgoodwin.cartodb.com/api/v2/sql?' + $.param({
		q: 'SELECT * FROM ubernightmay18',
		format: 'GeoJSON'
	});
	$.getJSON(url)

	.done(function(data) {

		var timeline = L.timeline(data, {
			getInterval: getInterval,
			pointToLayer: uberPointToLayer,
			waitToUpdateMap: true
		}).addTo(map);

		var timelineControl = L.timelineSliderControl({
			formatOutput: formatOutput,
			showTicks: false
		}).addTo(map);

		timelineControl.addTimelines(timeline);
	});
});