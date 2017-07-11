import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuth, DataService } from 'forcejs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;

  constructor(public navCtrl: NavController) {
    this.loadUsers()
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
}
