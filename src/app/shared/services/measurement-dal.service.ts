import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Measurement } from 'src/app/models/measurement';
import { GroupDALService } from './group-dal.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementDalService {
  measurements: Observable<any[]>;

  constructor(
    public afs: AngularFirestore,
    private groupService: GroupDALService
  ) {
    this.measurements = this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
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
