import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { ContactsServiceProvider } from '../../providers/contacts-service/contacts-service';

@IonicPage()
@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html',
})
export class ContactEditPage {

  contact: any;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private service: ContactsServiceProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactEditPage');

    this.contact = this.navParams.get('contact') || {};
  }

  saveContact() {
    this.service.saveContact(this.contact)
      .then(results => {
        console.log('updateContact was a success');
        console.log(results);

        this.viewCtrl.dismiss();
      })
      .catch(error => {
        console.log('updateContact had an error');
        console.log(error);
      })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
