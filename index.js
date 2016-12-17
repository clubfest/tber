
function getQueryUrl(queryBy, routesKey, routesVal, apiKey) {
  return 'https://realtime.mbta.com/developer/api/v2/' + queryBy + '?' + routesKey + '=' + routesVal + '&format=json&api_key=' + apiKey;
}

var apiKey = 'SGED1xrcdUiBRkdRrq6zJQ';


var redVehiclesUrl = getQueryUrl('vehiclesbyroutes', 'routes', 'Red', apiKey); 
var redPredictionsUrl = getQueryUrl('predictionsbyroutes', 'routes', 'Red', apiKey);
var redStopsUrl = getQueryUrl('stopsbyroute', 'route', 'Red', apiKey); 

var north = 'Northbound';
var south = 'Southbound';

var vehicles = [];
var stops = [];

function getVehicles(vehiclesData) {
  vehicles = [];
  vehiclesData['mode'].forEach(function(mode) {
    mode['route'].forEach(function(route) {
      route['direction'].forEach(function(direction) {
        direction['trip'].forEach(function(trip) {
          var vehicle = trip.vehicle;
          vehicle['direction'] = direction.direction_name;
          vehicles.push(vehicle);
        });
      });
    });
  });
  return vehicles;
}

$.get(redStopsUrl, function(data) {
  data.direction[0].stop.forEach(function(stop) {
    stop.lat = parseFloat(stop.stop_lat);
    stop.lng = parseFloat(stop.lng);
    stops.push(stop);
  });
  stop = stops[1];
  initMap(parseFloat(stop.stop_lat), parseFloat(stop.stop_lon));
});

$.get(redVehiclesUrl, function(data, status, xhr){
  vehicles = getVehicles(data);
}, 'json');

/////////// Map
var map;
function initMap(latitude, longitude) {
  latitude = latitude || 42.39674;
  longitude = longitude || -71.121815;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 15,
  });
}
