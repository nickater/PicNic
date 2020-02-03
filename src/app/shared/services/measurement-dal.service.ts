import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Measurement } from 'src/app/models/measurement';
import { GroupDALService } from './group-dal.service';
import { of, concat, Observable, combineLatest } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeasurementDalService {
  privateMeasurements: Observable<any>;
  publicMeasurements: Observable<any>;
  allMeasurements: Observable<any>;

  collection = this.afs
    .collection('groups')
    .doc(this.groupService.groupId)
    .collection('measurements');

  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {
    this.getPrivateMeasurements();
    this.getPublicMeasurements();
    this.allMeasurements = combineLatest([
      this.privateMeasurements,
      this.publicMeasurements
    ]);
  }

  getPrivateMeasurements() {
    this.privateMeasurements = this.collection.valueChanges();
  }

  getPublicMeasurements() {
    this.publicMeasurements = this.afs
      .collection('measurements')
      .valueChanges();
  }

  mapMeasurements(measurements) {
    const allMeasurements = [];
    if (measurements instanceof Array) {
      measurements.forEach((element) => {
        if (element instanceof Array) {
          element.forEach((subElement) => {
            allMeasurements.push(subElement);
          });
        } else {
          allMeasurements.push(element);
        }
      });
    }
    return allMeasurements;
  }

  addMeasurement(measurement: Measurement) {
    this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('measurements')
      .add(measurement);
  }
}
