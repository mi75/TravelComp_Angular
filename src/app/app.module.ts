import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FootercmpComponent } from './footercmp/footercmp.component';
import { HeadercmpComponent } from './headercmp/headercmp.component';
import { BodycmpComponent } from './bodycmp/bodycmp.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminComponent } from './admin/admin.component';
import { MSliderComponent } from './m-slider/m-slider.component';
import { MReviewsComponent } from './m-reviews/m-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    FootercmpComponent,
    HeadercmpComponent,
    BodycmpComponent,
    ContactsComponent,
    AdminComponent,
    MSliderComponent,
    MReviewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BodycmpComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
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
