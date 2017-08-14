import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


import { ContactDetailsPage } from '../contact-details/contact-details';
import { ContactsServiceProvider } from '../../providers/contacts-service/contacts-service';

@IonicPage()
@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html',
})
export class ContactEditPage {

  contact: any;

  constructor(
    public navCtrl: NavController,
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
        this.navCtrl.push(ContactDetailsPage, { "id": this.contact.Id });
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
