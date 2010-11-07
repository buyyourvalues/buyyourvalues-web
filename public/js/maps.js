/*
 * Google Maps Interface file
 */

var map;

var initialize_map = function ()
{
    var mapDiv = document.getElementById('map-canvas');

    map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListenerOnce(map, 'tilesloaded', addMarkers);
}

var addMarkers = function ()
{
    var bounds = map.getBounds();
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();
    var lngSpan = northEast.lng() - southWest.lng();
    var latSpan = northEast.lat() - southWest.lat();
    for (var i = 0; i < 10; i++) {
        var latLng = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
                southWest.lng() + lngSpan * Math.random());
        var marker = new google.maps.Circle({
            center: latLng,
            map: map,
            radius: 50,
            strokeOpacity: 0,
            fillColor: "#cc0000",
            fillOpacity: 0.7
        });
    }

    // Add a Circle overlay to the map
    var gop_circle = new google.maps.Circle({
        center: map.getCenter(),
        map: map,
        radius: 50,
        strokeOpacity: 0,
        fillColor: "#cc0000",
        fillOpacity: 0.7
    });

    var dem_circle = new google.maps.Circle({
        center: new google.maps.LatLng(37.4440, -122.1440),
        map: map,
        radius: 50,
        strokeOpacity: 0,
        fillColor: "#0000cc",
        fillOpacity: 0.7
    });

}
