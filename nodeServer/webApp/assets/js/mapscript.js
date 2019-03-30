var myLatlng = new google.maps.LatLng(48.713892, 21.256453);
var mapOptions = {
    zoom: 15,
    center: myLatlng,
    scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
    styles: [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }]

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