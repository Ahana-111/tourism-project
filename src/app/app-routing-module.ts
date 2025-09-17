import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { ActivitiesComponent } from './activities/activities.component';
import { BookTourComponent } from './book-tour/book-tour.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // default route
  { path: 'home', component: HomeComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'book-tour', component: BookTourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}