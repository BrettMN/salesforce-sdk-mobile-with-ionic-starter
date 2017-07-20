import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactDetailsPage } from './contact-details';

@NgModule({
  declarations: [
    ContactDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactDetailsPage),
  ],
  exports: [
    ContactDetailsPage
  ]
})
export class ContactDetailsPageModule {}
