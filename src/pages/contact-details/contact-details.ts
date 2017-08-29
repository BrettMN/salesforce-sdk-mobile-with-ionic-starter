import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ActionSheetController, Platform } from 'ionic-angular';

import { ContactsPage } from '../../pages/contacts/contacts';
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
    private service: ContactsServiceProvider,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform
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

  updateContact() {
    let editModal = this.modalCtrl.create(ContactEditPage, { contact: this.contact });

    editModal.present();
  }

  deleteContact() {
    let confirmDelete = this.alertCtrl.create({
      title: `Delete Contact?`,
      message: `Are you sure you want to delete ${this.contact.Name}?`,
      buttons: [
        {
          text: 'No',
          handler: () => {

            confirmDelete.dismiss();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.service.deleteContact(this.contact.Id)
              .then((result) => {

                this.navCtrl.setRoot(ContactsPage);
              });
          }
        }
      ]
    });

    confirmDelete.present();
  }

  showActions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: `Modify ${this.contact.Name}?`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            actionSheet.onDidDismiss(() => {


              this.deleteContact();
            });
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'build' : null,
          handler: () => {

            actionSheet.onDidDismiss(() => {

              this.updateContact();
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null
        }
      ]
    });

    actionSheet.present();
  }
}
