import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Measurement } from 'src/app/models/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementDalService {
  measurements: Observable<any>;

  constructor(public afs: AngularFirestore) {
    this.measurements = this.afs
      .collection('measurements')
      .valueChanges({ idField: 'id' });
  }

  getMeasurements() {
    return this.measurements;
  }

  addMeasurement(measurement: Measurement) {
    this.afs.collection('measurements').add(measurement);
  }
}
