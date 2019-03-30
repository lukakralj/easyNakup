var myLatlng = new google.maps.LatLng(48.713892, 21.256453);
var mapOptions = {
    zoom: 15,
    center: myLatlng,
    scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
    styles: [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}]
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

// To add the marker to the map, call setMap();


var directionsService = new google.maps.DirectionsService();
var renderOptions = { draggable: true };
var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
directionsPanel = document.getElementById("map")



//set the directions display service to the map
directionDisplay.setMap(map);
//set the directions display panel
//panel is usually just and empty div.  
//This is where the turn by turn directions appear.
directionDisplay.setPanel(directionsPanel);

var getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
let json_data =getParams(window.location.href)
items = []
for (var i in json_data){
    items.push(json_data[i]);
}
//build the waypoints
//free api allows a max of 9 total stops including the start and end address
//premier allows a total of 25 stops. 
var waypoints = [];
for (var i = 0; i < items.length; i++) {
    var address = items[i];
    if (address !== "") {
        waypoints.push({
            location: address,
            stopover: true
        });
    }
}

//set the starting address and destination address
var originAddress = "Kukučínova 2, 040 01 Juh";
var destinationAddress = "Kukučínova 2, 040 01 Juh";

//build directions request
var request = {
    origin: originAddress,
    destination: destinationAddress,
    waypoints: waypoints, //an array of waypoints
    optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
    travelMode: google.maps.DirectionsTravelMode.DRIVING
};

//get the route from the directions service
directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionDisplay.setDirections(response);
    }
    else {
        console.log(response)
    }
});