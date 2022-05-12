import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BaseClientComponent } from './base-client/base-client.component';
import { MarsClientComponent } from './base-client/mars-client/mars-client.component';
import { HersheysClientComponent } from './base-client/hersheys-client/hersheys-client.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    BaseClientComponent,
    MarsClientComponent,
    HersheysClientComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
