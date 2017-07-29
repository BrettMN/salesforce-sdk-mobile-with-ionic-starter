import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { OAuth, DataService } from 'forcejs';

/*
  Generated class for the ContactsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ContactsServiceProvider {

  constructor() {
    console.log('Hello ContactsServiceProvider Provider');
  }

  loadContacts() {
    let oauth = OAuth.createInstance();

    return oauth.login()
      .then(oauthResult => {
        let service = DataService.createInstance(oauthResult);

        return service.query('SELECT Id, Name FROM Contact LIMIT 50');

      });
  }

  getContact(id: string) {
    let oauth = OAuth.createInstance();

    return oauth.login()
      .then(oauthResult => {
        let service = DataService.createInstance(oauthResult);

        return service.query(`SELECT Id, FirstName, LastName, Name, Email, MobilePhone FROM Contact WHERE Id = '${id}'`);

      });
  }

  updateContact(
    contact:
      {
        Id: string,
        FirstName: string,
        LastName: string,
        Email: string,
        MobilePhone: string,
        Name: string
      }
  ) {
    let oauth = OAuth.createInstance();

    delete contact.Name;

    return oauth.login()
      .then(oauthResult => {
        let service = DataService.createInstance(oauthResult);

        return service.update('contact', contact);

      });
  }

}
