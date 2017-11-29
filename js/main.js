/* Insert cool JavaScript here */
console.log('Castle Coding for the win 🦄');

window.addEventListener('scroll', scrollStuff);

function scrollStuff() {
    /*
    Adding cool parallax effects to the header background
    Also adding a fadeout, because that it pretty sweet
    */

    const windowScrolltop = window.scrollY;
    const header_background = document.querySelector('.header_background');
    const map_mapparallax = document.querySelector('.map_parallax');
    const transformValue = (windowScrolltop / 2);
    const opacityValue = 1 - (windowScrolltop / 400);

    if (windowScrolltop > 1) {
        /*
        Only apply if windowScrolltop is more than 1, this is to prevent mobile "pull to refresh" thing to look wierd
        */
        header_background.style.transform = 'translateY('+transformValue+'px)';
        header_background.style.opacity = opacityValue;
    } else {
        header_background.style.transform = 'translateY(0px)';
        header_background.style.opacity = 1;
    }

}

function initMap() {

    var map_obj = document.getElementById('googlemap');
    var map_style = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
    ];

    var theCastleLatLng = {lat: 59.3261685, lng: 18.0739393};

    var map = new google.maps.Map(map_obj, {
      center: theCastleLatLng,
      zoom: 15,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      styles: map_style,
    });

    var markerImage = 'img/CastleCodingMarker.png';
    var markerImage = {
        url: 'img/CastleCodingMarker.png',
        scaledSize: new google.maps.Size(100, 108)
      };
    var marker = new google.maps.Marker({
        position: theCastleLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Castle Coding',
        icon: markerImage,
    });


}

