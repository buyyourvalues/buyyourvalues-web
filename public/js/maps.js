/*
 * Google Maps Interface file
 */

var map;
var boundaries;
var points = new Array();
var pointsById = new Array();
var max_contr = 0;
var min_contr = 9999999;

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

    var totals = [0, 0, 0];

    $.each(response, function () {
        var business_totals = processBusiness(this);

        if (top_lat < this.latitude)
            top_lat = this.latitude;

        if (bottom_lat > this.latitude)
            bottom_lat = this.latitude;

        if (left_lng < this.longitude)
            left_lng = this.longitude;

        if (right_lng > this.longitude)
            right_lng = this.longitude;

        totals[0] += business_totals[0];
        totals[1] += business_totals[1];
        totals[2] += business_totals[2];
    });

    update_chart([
        {
            'amount': totals[0],
            'party': 'Democrat',
            'color': '0000FF'
        },
        {
            'amount': totals[1],
            'party': 'Republican',
            'color': 'FF0000'
        },
        {
            'amount': totals[2],
            'party': 'Independent',
            'color': '00FF00'
        }
    ]);

    boundaries = new google.maps.LatLngBounds(
        new google.maps.LatLng(bottom_lat, left_lng),
        new google.maps.LatLng(top_lat, right_lng)
    );

    var range = max_contr - min_contr;

    console.log('max=', max_contr, 'min=', min_contr, 'range=', range);

    // There is a problem with this next block:
    // We need to accumulate all the contributions by a particular location. This only graphs one
    // of the contributions.
    $.each(points, function () {
        console.log(this.total);
        var t = this.total[0] + this.total[1] + this.total[2];

        var w = t - min_contr;
        var weighed = w / range * 100 + 100;

        console.log('t=', t, 'w=', w, 'weighed=', weighed);

        this.point.setRadius(Math.floor(weighed));
        console.log('Setting ', this.point, 'to', Math.floor(weighed));
    });

    map.fitBounds(boundaries);
}

var reset_boundaries = function ()
{
    map.fitBounds(boundaries);
}

var processBusiness = function (business)
{
    var parties = new Array();

    var total = 0;

    $('table#contributions').append(
        '<tr id="' + business.business_id + '"><td onclick="pointsById[' + business.business_id + '].infoWindow(show(map))">' + business.business_name + '</td></tr>'
    );

    $.each(business.contributions, function () {
        var party = this.party;
        total += this.amount;

        if (this.amount > max_contr)
            max_contr = this.amount

        if (this.amount < min_contr)
            min_contr = this.amount;
        if (min_contr < 0)
            min_contr = 0;

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

    var amount = parties['D'] || 0;
    var party = 'D';

    if (amount < parties['R'])
    {
        amount = parties['R'];
        party = 'R';
    }

    if (amount < parties['I'])
    {
        amount = parties['I'];
        party = 'I';
    }

    var latLng = new google.maps.LatLng(business.latitude, business.longitude);

    if (!isNaN(p_d) && !isNaN(p_r) && !isNaN(p_i))
    {
        var tooltip = _.template($('#google_map_tooltip_tmp').html(), business);

        var point = new google.maps.Circle({
            center: latLng,
            map: map,
            radius: 100,
            strokeOpacity: 0,
            fillColor: "#" + p_r_h + p_i_h + p_d_h,
            fillOpacity: 0.9,
            infoWindow: new google.maps.InfoWindow({
                position: latLng,
                content: tooltip
            })
        });

        //google.maps.event.addListener(point, 'mouseover', function() {
        //});

        google.maps.event.addListener(point, 'click', function() {
            console.log(this);

            $.each(points, function () {
                if (this.point)
                    this.point.infoWindow.close();
            });
            point.infoWindow.open(map);

            //$('.highlight').removeClass('highlight');
            //$('tr#' + business.business_id).each(function () {
                //$(this).find('td').addClass('highlight');
            //});
        });

        points.push(
            {
                'point': point,
                'total': [
                    (parties['D'] || 0),
                    (parties['R'] || 0),
                    (parties['I'] || 0)
                ]
            }
        );

        pointsById[business.business_id] = point;
    }

    return [p_d, p_r, p_i];
}
