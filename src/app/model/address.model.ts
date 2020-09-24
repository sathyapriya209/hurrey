import * as firebase from 'firebase/app'


export class Address {
    city: string;
    district: string;
    country: string;
    location: string
    latlong: firebase.firestore.GeoPoint;

}
