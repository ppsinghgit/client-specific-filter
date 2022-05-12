import { Component, OnInit } from '@angular/core';
import { BaseClientComponent } from '../base-client.component';

@Component({
  selector: 'app-hersheys-client',
  templateUrl: './hersheys-client.component.html',
  styleUrls: ['./hersheys-client.component.css'],
})
export class HersheysClientComponent
  extends BaseClientComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {}
}
