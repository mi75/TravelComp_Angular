import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CommonFooterComponent } from './common-footer/common-footer.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MainReviewsComponent } from './main-reviews/main-reviews.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ValidatorMessageComponent } from './validator-message/validator-message.component';
import { ModalReviewsFormComponent } from './modal-reviews-form/modal-reviews-form.component';
import { AdminToursComponent } from './admin-tours/admin-tours.component';
import { NewTourComponent } from './new-tour/new-tour.component';
import { ModalTripFormComponent } from './modal-trip-form/modal-trip-form.component';
import { TourPageComponent } from './tour-page/tour-page.component';
import { TripsFeaturesListComponent } from './trips-features-list/trips-features-list.component';
import { NewToursFeatureComponent } from './new-tours-feature/new-tours-feature.component';
import { ModalFeatureFormComponent } from './modal-feature-form/modal-feature-form.component';
import { AllTripsComponent } from './all-trips/all-trips.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonFooterComponent,
    CommonHeaderComponent,
    MainPageComponent,
    AdminPageComponent,
    MainReviewsComponent,
    MainSliderComponent,
    ContactsPageComponent,
    ValidatorMessageComponent,
    ModalReviewsFormComponent,
    AdminToursComponent,
    NewTourComponent,
    ModalTripFormComponent,
    TourPageComponent,
    TripsFeaturesListComponent,
    NewToursFeatureComponent,
    ModalFeatureFormComponent,
    AllTripsComponent,
    AdminReviewsComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'contacts',
        component: ContactsPageComponent
      },
      {
        path: 'admin',
        component: AdminPageComponent
      },
      {
        path: 'login',
        component: AdminLoginComponent
      },
      {
        path: 'allreviews',
        component: AdminReviewsComponent
      },
      {
        path: 'alltours',
        component: AdminToursComponent
      },
      {
        path: 'allTrips',
        component: AllTripsComponent
      },
      {
        path: 'newtour',
        component: NewTourComponent
      },
      {
        path: 'tourpage/:tourId',
        component: TourPageComponent
      },
      {
        path: 'featureslist',
        component: TripsFeaturesListComponent
      },
      {
        path: 'newfeature',
        component: NewToursFeatureComponent
      },
      {
        path: 'administrator',
        component: AdminLoginComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
