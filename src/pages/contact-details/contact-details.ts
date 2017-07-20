import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ContactsServiceProvider } from '../../providers/contacts-service/contacts-service';

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  contact: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ContactsServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailsPage');

    this.getContact(this.navParams.data['id']);
  }

  getContact(id: string) {
    this.service.getContact(id)
      .then(results => {

        this.contact = results.records[0];
      })
  }
}
