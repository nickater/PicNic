import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Measurement } from 'src/app/models/measurement';
import { GroupDALService } from './group-dal.service';
import {
  of,
  concat,
  Observable,
  combineLatest,
  merge,
  forkJoin,
  zip
} from 'rxjs';
import { mergeMap, map, tap, concatAll, mergeAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeasurementDalService {
  allMeasurements$: Observable<Measurement[]>;

  privateMeasurementPath = this.afs
    .collection('groups')
    .doc(this.groupService.groupId)
    .collection<Measurement>('measurements');

  publicMeasurementPath = this.afs.collection<Measurement>('measurements');

  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {
    this.getPrivateMeasurements();
    this.getPublicMeasurements();
  }

  getSingleMeasurement(id: string, type: 'public' | 'private') {
    if (type === 'public') {
      return this.getSinglePublicMeasurement(id);
    } else if (type === 'private') {
      return this.getSinglePrivateMeasurement(id);
    }
  }

  get publicMeasurements$(): Observable<Measurement[]> {
    return this.getPublicMeasurements();
  }

  get privateMeasurements$(): Observable<Measurement[]> {
    return this.getPrivateMeasurements();
  }

  getSinglePrivateMeasurement(id: string) {
    let measurementDoc: AngularFirestoreDocument<Measurement>;
    let measurement$: Observable<Measurement>;
    measurementDoc = this.privateMeasurementPath.doc(id);
    measurement$ = measurementDoc.valueChanges();
    return measurement$;
  }

  getSinglePublicMeasurement(id: string) {
    let measurementDoc: AngularFirestoreDocument<Measurement>;
    let measurement$: Observable<Measurement>;
    measurementDoc = this.privateMeasurementPath.doc(id);
    measurement$ = measurementDoc.valueChanges();
    return measurement$;
  }

  getPrivateMeasurements() {
    let measurementCollection: AngularFirestoreCollection<Measurement>;
    let privateMeasurements$: Observable<Measurement[]>;
    measurementCollection = this.privateMeasurementPath;
    privateMeasurements$ = measurementCollection.valueChanges();
    return privateMeasurements$;
  }

  getPublicMeasurements() {
    let measurementCollection: AngularFirestoreCollection<Measurement>;
    let publicMeasurements$: Observable<Measurement[]>;
    measurementCollection = this.afs.collection('measurements');
    publicMeasurements$ = measurementCollection.valueChanges();
    return publicMeasurements$;
  }

  combineMeasurements() {
    let combined$: Observable<Measurement[]>;
    combined$ = zip(this.publicMeasurements$, this.privateMeasurements$).pipe(
      map((res) => res[0].concat(res[1])),
      map((res) => this.sortMeasurementsByShortName(res))
    );
    return combined$;
  }

  mapMeasurements(measurements) {
    measurements = this.removeRedundantMeasurements(measurements);
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

    const sortedMeasurements = measurements.sort(compare);

    return sortedMeasurements;
  }

  removeRedundantMeasurements(measurements: Measurement[]): Measurement[] {
    const cleanMeasurements = measurements.filter(
      (measurement, index, self) => {
        index ===
          self.findIndex(
            (t) =>
              t.shortName === measurement.shortName &&
              t.fullName === measurement.fullName
          );
      }
    );

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
