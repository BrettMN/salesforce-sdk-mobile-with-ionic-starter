import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactDetailsPage } from '../contact-details/contact-details';

import { ContactsServiceProvider } from '../../providers/contacts-service/contacts-service';

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  contacts: Array<{ Id: string, Name: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ContactsServiceProvider, public modalCtrl: ModalController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');

    this.loadContacts();
  }

  loadContacts() {
    this.service.loadContacts()
      .then(results => {
        console.log(results);
        this.contacts = results.records;
      })
  }

  selectContact(id: string) {
    this.navCtrl.push(ContactDetailsPage, { "id": id });
  }

  addContact(contact: any) {
    let editModal = this.modalCtrl.create(ContactEditPage);

    editModal.present();
  }

}
