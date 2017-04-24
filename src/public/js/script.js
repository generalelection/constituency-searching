/* eslint-disable */


var map;
var bounds;
var markers = [];
var openWindow;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.8, lng: -1.55},
    zoom: 8
  });
}


function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}


$(function(){

  $('.form').on('submit', function(evt) {
    evt.preventDefault();
  });

  $('.btn').on('click', function(evt) {
    var filter = $('[name=filter]').val();
    var postcode = $('[name=postcode]').val();

		$.post('/nearby', {
      filter: filter,
			postcode: postcode
		}, function(response){
      bounds = new google.maps.LatLngBounds();

      var marker = new google.maps.Marker({
        position: { lat: response.you.latitude, lng: response.you.longitude },
        map: map
      });

			response.results.forEach(function(result){
        var marker = new google.maps.Marker({
          position: { lat: result.geo[0], lng: result.geo[1] },
          map: map
        });

        var infoWindow = new google.maps.InfoWindow({
          content:
            '<div style="max-width: 200px;">' +
              '<h4>' + result.mp + '</h4>' +
              '<p>' + result.name + '</p>' +
              '<p>' + result.party + '</p>' +
            '</div>'
        });
    
        marker.addListener('click', function(){
          if (openWindow){
            openWindow.close();

            if (openWindow != infoWindow){
              openWindow = infoWindow;
              infoWindow.open(map, marker);
            } else {
              openWindow = null;
            }
          } else {
            openWindow = infoWindow;
            infoWindow.open(map, marker);
          }
        });

        markers.push(marker);
        bounds.extend(marker.position);
      });

      map.fitBounds(bounds);
		});
	});

});