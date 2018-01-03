import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuth, DataService } from 'forcejs';

import { SmartstoreServiceProvider } from '../../providers/smartstore-service/smartstore-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;

  constructor(public navCtrl: NavController, public smartStore: SmartstoreServiceProvider) {
    this.loadUsers()

    // this.smartStore.fillSoup()
    //   // .then(() => {
    //   //   this.smartStore.getAllFromSoup()

    //   // })

  }

  loadUsers() {
    let oauth = OAuth.createInstance();

    oauth.login()
      .then(oauthResult => {
        let service = DataService.createInstance(oauthResult);

        service.query('SELECT Id, Name FROM User LIMIT 10')
          .then(response => {

            this.users = response.records;
          });
      });
  }

  fillSoup(){
    this.smartStore.fillSoup()
  }

  getSoupInfo(){
    this.smartStore.getAllFromSoup()
  }
}
