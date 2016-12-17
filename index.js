
function getQueryUrl(queryBy, routes, apiKey) {
  return 'http://realtime.mbta.com/developer/api/v2/' + queryBy + '?routes=' + routes + '&format=json&api_key=' + apiKey;
}

var apiKey = 'SGED1xrcdUiBRkdRrq6zJQ';


var redVehiclesUrl = getQueryUrl('vehiclesbyroutes', 'Red', apiKey); 
var redPredictionsUrl = getQueryUrl('predictionsbyroutes', 'Red', apiKey);

var north = 'Northbound';
var south = 'Southbound';

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

$.get(redVehiclesUrl, function(data, status, xhr){
  vehicles = getVehicles(data);
  console.log(vehicles);
}, 'json')
