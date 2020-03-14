import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {
  @Input() stillLoading: boolean;
  @Input() statement: string;
  constructor() {}

  ngOnInit() {}
}
