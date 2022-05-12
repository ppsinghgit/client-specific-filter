import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-client',
  templateUrl: './base-client.component.html',
  styleUrls: ['./base-client.component.css'],
})
export class BaseClientComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  baseEvent() {
    alert('base event');
  }
}
