import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMeasurementComponent } from './create-measurement/create-measurement.component';
import { UpdateMeasurementComponent } from './update-measurement/update-measurement.component';
import { ListMeasurementsComponent } from './list-measurements/list-measurements.component';
import { DeleteMeasurementComponent } from './delete-measurement/delete-measurement.component';

@NgModule({
  declarations: [
    CreateMeasurementComponent,
    UpdateMeasurementComponent,
    ListMeasurementsComponent,
    DeleteMeasurementComponent
  ],

  imports: [CommonModule]
})
export class MeasurementModule {}
