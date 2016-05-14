var tradeLayer;
var dotLayer;
var year = 2015;
var sql = new cartodb.SQL({
	user: 'sgoodwin'
});
var type = "'Total'";
var partner = "'both'";
<<<<<<< HEAD
var numCommas = function(){};
var loadWindowInfo = function(){};
var loadLineCharts = function(){};
=======
var numCommas = function() {};
var loadWindowInfo = function() {};
var loadLineCharts = function() {};
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510

$(document).ready(function() {
	cartodb.createVis('map', 'https://sgoodwin.cartodb.com/api/v2/viz/f1da5f84-1796-11e6-94e1-0ecfd53eb7d3/viz.json', {
			center: [40, -97],
			zoom: 4,
			cartodb_logo: false,
			infowindow: true,
			search: false,
<<<<<<< HEAD
			shareable: false
=======
			shareable: false,
			legends: false
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
		})
		.done(function(vis, layers) {

			///CartoDB map
			baseMap = layers[0];
			tradeLayer = layers[1].getSubLayer(1);
			var tradeLayerOptions = {
				sql: "SELECT * FROM americanborder_trade WHERE (partner ='CANADA' OR partner ='MEXICO') AND type = 'Total' AND year =" + year + "ORDER BY percent DESC",
				interactivity: "cartodb_id, lat, lon, portcity, portstate, portcode, type, tradevalue, pharmvalue, year",
			};
			tradeLayer.set(tradeLayerOptions);
			tradeLayer.setInteraction(true);

			dotLayer = layers[1].getSubLayer(0);
			var dotLayerOptions = {
				sql: "SELECT * FROM americanborder_dots WHERE (partner ='CANADA' OR partner ='MEXICO') AND type = 'Total' AND year =" + year + "ORDER BY percent DESC",
				interactivity: "cartodb_id, lat, lon, portcity, portstate, portcode, type, tradevalue, pharmvalue, year",
			};
			dotLayer.set(dotLayerOptions);

			///Leaflet feature map
			var map2 = L.map('map2', {
				zoomControl: false
			});
			L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Znb29kd2luIiwiYSI6ImJQdUdKVXMifQ.lZOV6aWFw9enohQagpxRIg', {
				attribution: '<a href= "mapbox.com">Mapbox</a>',
				maxZoom: 18
			}).addTo(map2);
			$('#map2').hide();

			///Hover cursor change on feature:
			tradeLayer.on('mouseover', function(feature) {
				$('.leaflet-container').css('cursor', 'pointer');
			});
			tradeLayer.on('mouseout', function() {
				$('.leaflet-container').css('cursor', '-webkit-grab');
			});

			///Hover infowindow reveal
			vis.addOverlay({
				type: 'tooltip',
<<<<<<< HEAD
				position: 'top|right',
				template: '<p class = "label">{{portcity}}, {{portstate}}</p>'
=======
				position: 'top|left',
				template: '<p>{{portcity}}, {{portstate}}</p>'
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
			});

			///Click event on feature: 
			tradeLayer.on('featureClick', function(e, latlng, pos, data, layerNumber) {
				numCommas = function(x) {
<<<<<<< HEAD
    				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
=======
					return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
				};
				///Show and localize leaflet map
				$('#map2').show();
				map2.setView([data.lat, data.lon], 15);
				///Clear template
				$('.results').empty();
				///Query and load data into template
				loadWindowInfo = function() {
					sql.execute("SELECT * FROM americanborder_trade WHERE portcode =" + data.portcode + "AND year =" + year + "ORDER BY percent DESC")
<<<<<<< HEAD
					.done(function(data) {
						console.log(data);
						var template = $('#templateValues').html();
						var context = {
							portname: data.rows[0],
							total: numCommas(data.rows[0].tradevalue),
							ptotal: numCommas(data.rows[0].pharmvalue),
							percenttotal: Math.floor(data.rows[0].percent * 1000) /1000,
							imports: numCommas(data.rows[1].tradevalue),
							pimports: numCommas(data.rows[1].pharmvalue),
							percentim: Math.floor(data.rows[1].percent * 1000) /1000,
							exports: numCommas(data.rows[2].tradevalue),
							pexports: numCommas(data.rows[2].pharmvalue),
							percentex: Math.floor(data.rows[2].percent * 1000) /1000,
						};
						var output = Mustache.render(template, context);
						$('.results').show();
						$('.results').append(output);
					});
				};
				loadLineCharts = function() {
					sql.execute("SELECT * FROM americanborder_trade WHERE portcode =" + data.portcode + "AND type =" + type + "ORDER BY percent DESC")
					.done(function(data){
						var years = ['Year'];
						var tvalue = ['Total Trade Value']; 
						var pvalue = ['Pharmaceutical Trade Value'];
						for (var i = 0; i < 9; i++){
							years[i+1] = data.rows[i].year;
							tvalue[i+1] = data.rows[i].tradevalue;
							pvalue[i+1] = data.rows[i].pharmvalue;
						}
						var columns1 = [years, tvalue];
						var columns2 = [years, pvalue];
						var chart1 = c3.generate({
							bindto: ('#chart1'),
							data: {
								x: 'Year',
								columns: columns1
							},
							axis: {
								y: {
									tick: {
										format: d3.format("$,")
									}
								}
							},
							size: {
								width: 340,
								height: 200
							},
							color: {
    							pattern: ['#cc0000']
							}
						});
						var chart2 = c3.generate({
							bindto: ('#chart2'),
							data: {
								x: 'Year',
								columns: columns2
							},
							axis: {
								y: {
									tick: {
										format: d3.format("$,")
									}
								}
							},
							size: {
								width: 340,
								height: 200
							},
							color: {
    							pattern: ['#cc0000']
							}
						});
					});
				};
				$('#stats-window').hide();
				$('#summary-window').show();
=======
						.done(function(data) {
							console.log(data);
							var template = $('#templateValues').html();
							var context = {
								year: year,
								portname: data.rows[0],
								total: numCommas(data.rows[0].tradevalue),
								ptotal: numCommas(data.rows[0].pharmvalue),
								percenttotal: Math.floor(data.rows[0].percent * 1000) / 1000,
								imports: numCommas(data.rows[1].tradevalue),
								pimports: numCommas(data.rows[1].pharmvalue),
								percentim: Math.floor(data.rows[1].percent * 1000) / 1000,
								exports: numCommas(data.rows[2].tradevalue),
								pexports: numCommas(data.rows[2].pharmvalue),
								percentex: Math.floor(data.rows[2].percent * 1000) / 1000,
							};
							var output = Mustache.render(template, context);
							$('.results').show();
							$('.results').append(output);
						});
				};
				loadLineCharts = function() {
					$('#stats-label').empty();
					sql.execute("SELECT * FROM americanborder_trade WHERE portcode =" + data.portcode + "AND type =" + type + "ORDER BY percent DESC")
						.done(function(data) {
							var years = ['Year'];
							var tvalue = ['Total Trade Value'];
							var pvalue = ['Pharmaceutical Trade Value'];
							for (var i = 0; i < 9; i++) {
								years[i + 1] = data.rows[i].year;
								tvalue[i + 1] = data.rows[i].tradevalue;
								pvalue[i + 1] = data.rows[i].pharmvalue;
							}
							var columns1 = [years, tvalue];
							var columns2 = [years, pvalue];
							var chart1 = c3.generate({
								bindto: ('#chart1'),
								data: {
									x: 'Year',
									columns: columns1
								},
								axis: {
									y: {
										tick: {
											format: d3.format("$,")
										}
									}
								},
								size: {
									width: 340,
									height: 200
								},
								color: {
									pattern: ['#cc0000']
								}
							});
							var chart2 = c3.generate({
								bindto: ('#chart2'),
								data: {
									x: 'Year',
									columns: columns2
								},
								axis: {
									y: {
										tick: {
											format: d3.format("$,")
										}
									}
								},
								size: {
									width: 340,
									height: 200
								},
								color: {
									pattern: ['#cc0000']
								}
							});
							var template2 = $('#templateValues2').html();
							var context2 = {
								portname: data.rows[0]
							};
							var output2 = Mustache.render(template2, context2);
							$('#stats-label').append(output2);
						});
				};
				$('.overview').hide();
				$('.statistics').hide();
				$('.summary').show();
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
				loadLineCharts();
				loadWindowInfo();
			});
		});

<<<<<<< HEAD
	$('#summary-window').hide();
	$('#stats-window').hide();

	///Arrows on click, reveal stats or summary windows
	$('#statsbutton').on('click', function() {
		$('#map2').hide();
		$('#summary-window').hide();
		$('#stats-window').show();
	});

	$('#sumbutton').on('click', function() {
		$('#stats-window').hide();
		$('#map2').show();
		$('.results').show();
		$('#summary-window').show();
		loadLineCharts();
	});

=======
	$('.summary').hide();
	$('.statistics').hide();
	$('.sources').hide();

	///Arrows on click, reveal stats, summary or sources windows
	$('#statsbutton1').on('click', function() {
		$('#map2').hide();
		$('.summary').hide();
		$('.statistics').show();
	});

	$('#sumbutton').on('click', function() {
		$('.statistics').hide();
		$('#map2').show();
		$('.results').show();
		$('.summary').show();
		loadLineCharts();
	});

	$('#sourcebutton').on('click', function() {
		$('#map2').hide();
		$('.summary').hide();
		$('.statistics').hide();
		$('.sources').show();
	});

	$('#statsbutton2').on('click', function() {
		$('#map2').hide();
		$('.summary').hide();
		$('.sources').hide();
		$('.statistics').show();
	});




>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
	///Initialize slider
	$(function() {
		$('#slider').slider({
			value: 2015,
			min: 2007,
			max: 2015,
			step: 1,
			slide: function(event, ui) {
<<<<<<< HEAD
				$('#amount').val(ui.value);
			}
		});
		$('#amount').val($('#slider').slider('value'));
=======
				$('#year-selector').val(ui.value);
			}
		});
		$('#year-selector').val($('#slider').slider('value'));
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
	});

	///Change event on selectors 
	///Query data on change	  
	$('#partnerSelect').add('#tradeSelect').add('#slider').on('change slidechange', function(ui) {
		///Slider change
<<<<<<< HEAD
		year = $('#amount').val();
=======
		year = $('#year-selector').val();
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
		$('.results').empty();
		///Selector changes
		type = tradeSelect.value;
		var partner = partnerSelect.value;
		var tradeQuery = "SELECT * FROM americanborder_trade WHERE (partner =" + partner + ") AND type = " + type + " AND year =" + year + "ORDER BY percent DESC";
		var dotQuery = "SELECT * FROM americanborder_dots WHERE (partner =" + partner + ") AND type = " + type + " AND year =" + year + "ORDER BY percent DESC";

		tradeLayer.setSQL(tradeQuery);
		dotLayer.setSQL(dotQuery);
		loadLineCharts();
		loadWindowInfo();
	});

	///Set bounds of map
	$('#partnerSelect').on('change', function() {
		var partner = partnerSelect.value;
		var bounds;
		switch (partner) {
			case "'CANADA' OR partner ='MEXICO'":
				bounds = [
					[59.45, -136.36],
					[18.00, -65.60]
				];
				break;
			case "'CANADA'":
				bounds = [
					[59.45, -136.36],
					[35.16, -67.37]
				];
				break;
			case "'MEXICO'":
				bounds = [
					[33.50, -117.72],
					[25.50, -96.35]
				];
				break;
		}
		baseMap.leafletMap.fitBounds(bounds);
	});
<<<<<<< HEAD
});
=======
});
>>>>>>> 44ba81ac640c4083af7c39634f27a51e310f4510
