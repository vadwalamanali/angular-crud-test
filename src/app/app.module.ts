import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {CountryInfoService} from './country-info.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { TestData } from './test-data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(TestData)
  ],
  providers: [CountryInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
