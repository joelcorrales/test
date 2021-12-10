import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RocketsComponent } from './rockets/rockets.component';
import { LaunchesComponent } from './launches/launches.component';
import { TestService } from './test.service';

@NgModule({
  declarations: [AppComponent, RocketsComponent, LaunchesComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [TestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
