import { Component, OnInit } from '@angular/core';
import { BaseClientComponent } from '../base-client.component';

@Component({
  selector: 'app-mars-client',
  templateUrl: './mars-client.component.html',
  styleUrls: ['./mars-client.component.css'],
})
export class MarsClientComponent extends BaseClientComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
