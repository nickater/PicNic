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
    return this.sortMeasurementsByShortName(allMeasurements);
  }

  sortMeasurementsByShortName(measurements: Measurement[]): Measurement[] {
    function compare(a, b) {
      const measurementA = a.shortName.toUpperCase();
      const measurementB = b.shortName.toUpperCase();

      let comparison = 0;
      if (measurementA > measurementB) {
        comparison = 1;
      } else if (measurementA < measurementB) {
        comparison = -1;
      }
      return comparison;
    }

    let sortedMeasurements = measurements.sort(compare);

    return sortedMeasurements;
  }

  removeRedundantMeasurements(measurements: Measurement[]): Measurement[] {
    let cleanMeasurements = measurements.filter((measurement, index, self) => {
      index ===
        self.findIndex(
          (t) =>
            t.shortName === measurement.shortName &&
            t.fullName === measurement.fullName
        );
    });

    return cleanMeasurements;
  }

  addMeasurement(measurement: Measurement) {
    this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('measurements')
      .add(measurement);
  }
}
