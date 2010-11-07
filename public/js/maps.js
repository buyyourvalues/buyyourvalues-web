/*
 * Google Maps Interface file
 */

var map;

var initialize_map = function ()
{
    var mapDiv = document.getElementById('map-canvas');

    map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(40.7483282, -73.9962255),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListenerOnce(map, 'tilesloaded', getBusinesses());
}

var addMarkers = function ()
{
    var bounds = map.getBounds();

    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();
    var lngSpan   = northEast.lng() - southWest.lng();
    var latSpan   = northEast.lat() - southWest.lat();

    // Create random markers
    for (var i = 0; i < 100; i++)
    {
        var latLng = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
                southWest.lng() + lngSpan * Math.random());
        addMarker(latLng);
    }
}

var addMarker = function (latLng)
{
    var r = Math.floor(Math.random() * 2);

    new google.maps.Circle({
        center: latLng,
        map: map,
        radius: 50,
        strokeOpacity: 0,
        fillColor: "#0000ff",
        fillOpacity: 1.0
    });
}

var getBusinesses = function ()
{
    $.get(
        '/businesses'
        {},
        function (resp) {
            console.log(resp);
        },
        'json'
    );
}


var processBusiness = function (business)
{

}
