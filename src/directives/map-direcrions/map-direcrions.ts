
import {Directive, Input} from '@angular/core';
import {GoogleMapsAPIWrapper} from "@agm/core";
declare var google: any;

@Directive({
  selector: 'google-map-directions'
})
export class MapDirecrionsDirective {
  @Input() origin;
  @Input() destination;
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

  updateDirections() {
    this.gmapsApi.getNativeMap().then(map => {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {lat: this.origin.lattitude, lng: this.origin.longitude},
        destination: this.destination,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'WALKING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }
}
