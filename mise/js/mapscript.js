// Initialize and add the map
function initMap() {
    const mise = {lat: 43.620900, lng: -79.533180};
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: mise,
      disableDefaultUI: true,
      styles: [
{
  "featureType": "all",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#1f1f1f"
      }
  ]
},
{
  "featureType": "all",
  "elementType": "labels",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "all",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "saturation": 36
      },
      {
          "color": "#454545"
      },
      {
          "lightness": 40
      }
  ]
},
{
  "featureType": "all",
  "elementType": "labels.text.stroke",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#000000"
      },
      {
          "lightness": "14"
      }
  ]
},
{
  "featureType": "all",
  "elementType": "labels.icon",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#9b2b2b"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#000000"
      },
      {
          "lightness": 20
      },
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "color": "#000000"
      },
      {
          "lightness": 17
      },
      {
          "weight": 1.2
      },
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "labels.text.stroke",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "administrative.country",
  "elementType": "geometry",
  "stylers": [
      {
          "visibility": "simplified"
      },
      {
          "hue": "#ff0000"
      }
  ]
},
{
  "featureType": "landscape",
  "elementType": "geometry",
  "stylers": [
      {
          "color": "#181818"
      },
      {
          "lightness": "0"
      }
  ]
},
{
  "featureType": "landscape",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "color": "#ffffff"
      }
  ]
},
{
  "featureType": "landscape.man_made",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "landscape.natural",
  "elementType": "geometry",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "hue": "#ff0000"
      }
  ]
},
{
  "featureType": "poi",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [
      {
          "color": "#000000"
      },
      {
          "lightness": 21
      },
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi.business",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#4f4f4f"
      },
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "color": "#000000"
      },
      {
          "lightness": 29
      },
      {
          "visibility": "simplified"
      },
      {
          "weight": "0.2"
      }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [
      {
          "color": "#2f2f2f"
      },
      {
          "lightness": "0"
      },
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "road.local",
  "elementType": "geometry",
  "stylers": [
      {
          "color": "#242424"
      },
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "transit",
  "elementType": "geometry",
  "stylers": [
      {
          "color": "#000000"
      },
      {
          "lightness": "16"
      },
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [
      {
          "color": "#212121"
      },
      {
          "lightness": "0"
      }
  ]
}
]
    });
    const marker = new google.maps.Marker({
      position: mise,
      map: map,
    });
  }