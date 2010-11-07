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
        '/businesses',
        {},
        processBusinesses,
        'json'
    );
}


var processBusinesses = function (response)
{
    //center: new google.maps.LatLng(40.7483282, -73.9962255),

    var top_lat = 40.748382,
        bottom_lat = 40.748382,
        left_lng = -73.9962255,
        right_lng = -73.9962255;

    $.each(response, function () {
        processBusiness(this);

        if (top_lat < this.latitude)
            top_lat = this.latitude;

        if (bottom_lat > this.latitude)
            bottom_lat = this.latitude;

        if (left_lng < this.longitude)
            left_lng = this.longitude;

        if (right_lng > this.longitude)
            right_lng = this.longitude;
    });

    console.log(
        'Top:', top_lat,
        'Bot:', bottom_lat,
        'Left:', left_lng,
        'Right:', right_lng
    );
}

var processBusiness = function (business)
{
    var parties = new Array();

    var total = 0;

    $.each(business.contributions, function () {
        party = this.party;
        total += this.amount;

        if (party != 'D' && party != 'R')
            party = 'I';

        if (! parties[this.party])
            parties[party] = 0;

        parties[party] += this.amount;
    });

    var p_d = Math.floor(255 * (parties['D'] || 0) / total);
    var p_r = Math.floor(255 * (parties['R'] || 0) / total);
    var p_i = Math.floor(255 * (parties['I'] || 0) / total);

    p_d_h = p_d.toString(16);
    p_r_h = p_r.toString(16);
    p_i_h = p_i.toString(16);

    if (p_d_h.length == 1)
        p_d_h = '0' + p_d_h;
    if (p_r_h.length == 1)
        p_r_h = '0' + p_r_h;
    if (p_i_h.length == 1)
        p_i_h = '0' + p_i_h;

    var latLng = new google.maps.LatLng(business.latitude, business.longitude);

    if (!isNaN(p_d) && !isNaN(p_r) && !isNaN(p_i))
    {
        new google.maps.Circle({
            center: latLng,
            map: map,
            radius: 50,
            strokeOpacity: 0,
            fillColor: "#" + p_r_h + p_i_h + p_d_h,
            fillOpacity: 1.0
        });
    }
}
