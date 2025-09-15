import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Destinations } from './destinations/destinations';
import { Activities } from './activities/activities';
import { BookTour } from './book-tour/book-tour';

@NgModule({
  declarations: [
    App,
    Home,
    Destinations,
    Activities,
    BookTour
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
