import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FootercmpComponent } from './footercmp/footercmp.component';
import { HeadercmpComponent } from './headercmp/headercmp.component';
import { BodycmpComponent } from './bodycmp/bodycmp.component';
import { AdminComponent } from './admin/admin.component';
import { MReviewsComponent } from './m-reviews/m-reviews.component';
import { MSlider2Component } from './m-slider2/m-slider2.component';
import { Contacts2Component } from './contacts2/contacts2.component';
import { ValidatorMessageComponent } from './validator-message/validator-message.component';

@NgModule({
  declarations: [
    AppComponent,
    FootercmpComponent,
    HeadercmpComponent,
    BodycmpComponent,
    AdminComponent,
    MReviewsComponent,
    MSlider2Component,
    Contacts2Component,
    ValidatorMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BodycmpComponent
      },
      {
        path: 'contacts',
        component: Contacts2Component
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
