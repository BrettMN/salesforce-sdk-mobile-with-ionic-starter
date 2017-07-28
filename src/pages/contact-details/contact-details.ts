import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ContactEditPage } from '../../pages/contact-edit/contact-edit';
import { ContactsServiceProvider } from '../../providers/contacts-service/contacts-service';

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  contact: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private service: ContactsServiceProvider
  ) { }

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

  updateContact(contact: any) {
    let editModal = this.modalCtrl.create(ContactEditPage, { contact: contact });

    editModal.present();
  }
}
