import {
  Component,
  OnInit,
  Input,
  Output,
  Optional,
  Inject
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})
export class AreYouSureComponent implements OnInit {
  subject: string;
  constructor(
    private dialogRef: MatDialogRef<AreYouSureComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.subject = data;
  }

  ngOnInit() {}

  imSure() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
