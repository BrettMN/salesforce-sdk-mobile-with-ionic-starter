import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { OAuth, DataService } from 'forcejs';

// Tell TypeScript that I know better than it
declare var force: any;

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

saveContact(
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

  if (contact.Id) {

    delete contact.Name;

    return new Promise(function (resolve, reject) {

      force.login(function () {
        console.log('auth success');
        force.update('contact',
          contact,
          function (result) {
            console.log('update success');
            console.log({ result });
            resolve(result);
          }),
          function (result) {
            console.log('update failed');
            console.log({ result });
            reject(result);
          }
      });

    });
  } else {
    
    return new Promise(function (resolve, reject) {

      force.login(function () {
        console.log('auth success');
        force.create('contact',
          contact,
          function (result) {
            console.log('create success');
            console.log({ result });
            resolve(result);
          }),
          function (result) {
            console.log('create failed');
            console.log({ result });
            reject(result);
          }
      });

    });
  }
}

}
