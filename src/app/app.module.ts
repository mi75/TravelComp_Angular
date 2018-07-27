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
    NewTourComponent
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
        path: 'alltours',
        component: AdminToursComponent
      },
      {
        path: 'newtour',
        component: NewTourComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
