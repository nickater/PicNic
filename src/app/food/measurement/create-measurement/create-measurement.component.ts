import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Measurement } from 'src/app/models/measurement';
import { MatDialogRef } from '@angular/material';
import { MeasurementDalService } from 'src/app/shared/services/measurement-dal.service';

@Component({
  selector: 'app-create-measurement',
  templateUrl: './create-measurement.component.html',
  styleUrls: ['./create-measurement.component.scss']
})
export class CreateMeasurementComponent implements OnInit {
  addMeasurementForm: FormGroup;
  measurement: Measurement;

  constructor(
    private fb: FormBuilder,
    private ms: MeasurementDalService,
    private dialogRef: MatDialogRef<CreateMeasurementComponent>
  ) {}

  ngOnInit() {
    this.addMeasurementForm = this.fb.group({
      shortName: ['', Validators.required],
      fullName: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.addMeasurementForm.valueChanges.subscribe((res) => {
      this.measurement = res;
    });
  }

  submitHandler() {
    console.log(this.addMeasurementForm.value);
    this.ms.addMeasurement(this.measurement);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
