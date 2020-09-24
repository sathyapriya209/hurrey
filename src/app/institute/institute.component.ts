import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Address } from '../model/address.model';
import { Institute } from '../model/institute.model';
import * as firebase from 'firebase/app'
import * as uuid from 'uuid';
import { FormControl } from '@angular/forms';
import LocationPicker from "location-picker";

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
  isEditMode = false;
  lp: LocationPicker;
  institute: Institute;
  institutes: Institute[];
  constructor(private cs: CommonService) { }

  ngOnInit(): void {
    this.getAllInstitutes();
    this.lp = new LocationPicker('map');
    this.initializeInstitute();
  }
  initializeInstitute() {
    this.institute = new Institute();
    let address: Address = new Address();
    this.institute.address = address;
    this.isEditMode = false;
  }

  getAllInstitutes() {
    this.cs.getInstitutes().subscribe(res => {
      this.institutes = res;
    });
  }

  createInstitute() {
    if (!this.isEditMode) {
      this.institute.id = uuid.v4();

      this.cs.createInstitute(this.institute).then(res => {
        this.initializeInstitute();
        this.getAllInstitutes();
      });
    } else {
      this.cs.updateInstitue(this.institute).then(res => {
        this.initializeInstitute();
        this.getAllInstitutes();
      });
    }
  }
  getlocation() {
    let position = this.lp.getMarkerPosition();
    this.institute.address.location = position.lat + ',' + position.lng;
    this.institute.address.latlong = new firebase.firestore.GeoPoint(position.lat, position.lng);

  }

  editInstitute(institute: Institute) {
    this.institute = { ...institute };
    this.institute.address = { ...institute.address };
    this.institute.address.location = this.institute.address.latlong.latitude + ',' + this.institute.address.latlong.longitude;
    this.isEditMode = true;

  }
}
