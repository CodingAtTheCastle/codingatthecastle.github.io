/* Insert cool JavaScript here */
console.log('Castle Coding for the win 🦄');

/*
A tip if you want to serve this static from a local webserver is http-server
https://www.npmjs.com/package/http-server
*/

window.addEventListener('scroll', scrollStuff);

//puts all .smooth_scroll in an array
const smooth_scroll_links = document.querySelectorAll('.smooth_scroll');

//loop through array to addEventListener on each one of the objects
smooth_scroll_links.forEach(function(e) {
  e.addEventListener('click', smooth_scroll);
});

function smooth_scroll(e) {
  e.preventDefault();
  const link = e.currentTarget;
  
  //substring(1) removes the first # character from the string
  let href = link.getAttribute('href').substring(1);
  
  const target = document.getElementById(href);
  console.log(href);
    
  //this just adds the hash to the URL, as you would normaly expect from clicking a hash link
  window.history.pushState("new url", "Castle Coding", link.getAttribute('href'));
  
  target.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}

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

    var markerDropped = false;
    var map_obj = document.getElementById('googlemap');

    /*
      Go here to create a map style: https://mapstyle.withgoogle.com/

      Make sure to add the following:
      
      {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      }

      to get a cleaner map without a bunch of Points of Interests

    */
    var map_style = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'poi',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
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

    /*
      Check out this website for more info on what you can do with the google maps api
      https://developers.google.com/maps/documentation/javascript/examples/
    */

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
        scaledSize: new google.maps.Size(80, 86)
      };

    var marker = new google.maps.Marker({
        position: theCastleLatLng,
        animation: google.maps.Animation.DROP,
        title: 'Castle Coding',
        icon: markerImage,
    });

    /*
      Using Waypoints Inview to trigger a marker drop when '.mapoverlay' comes in view
      http://imakewebthings.com/waypoints/
    */

    var dropMarker = new Waypoint.Inview({
      element: document.querySelector('.mapoverlay'),
      enter: function(direction) {
        //mapoverlay is now on screen, add the marker if markerDropped is false
        if (!markerDropped) {
          marker.setMap(map);
          markerDropped = true;
        }
      }
    });

    var removeMarker = new Waypoint.Inview({
      element: document.querySelector('.mapwrapper'),
      exited: function(direction) {
        //'.mapwrapper' has exited the screen, remove the marker if markerDropped is true
        if (markerDropped) {
          marker.setMap(null);
          marker.setAnimation(google.maps.Animation.DROP)
          markerDropped = false;
        }
      }
    });

}