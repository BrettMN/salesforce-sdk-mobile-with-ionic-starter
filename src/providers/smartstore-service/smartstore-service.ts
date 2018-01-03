import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ContactsServiceProvider } from '../contacts-service/contacts-service'

declare var cordova: any;

interface sdkNavigator extends Navigator {
  smartstore: any
}

@Injectable()
export class SmartstoreServiceProvider {

  // First post

  //private storeName = 'contactsApp'
  private soupName = 'contacts'

  private smartStore(): any {
    return cordova.require("com.salesforce.plugin.smartstore")
  }

  constructor(private contactsService: ContactsServiceProvider) {

    console.log('constructor')

    //const smartStore = cordova.require("com.salesforce.plugin.smartstore")

    // const storeConfig = {
    //   storeName: this.storeName,
    //   isGlobalStore: false
    // }

    const indexSpecs = [
      {
        path: 'Name',
        type: 'string'
      },
      {
        path: 'Id',
        type: 'string'
      }]

    let success = (soupName) => console.log(`Soup ${soupName} was successfully created!`)

    let failure = (error) => console.error(`Registering soup fails with error: ${error}`)

    this.smartStore().registerSoup(this.soupName, indexSpecs, success, failure)
  }

  // End First Post

  // Second Post

  fillSoup() {

    console.log('fillSoup')

    return this.contactsService.loadContacts()
      .then(results => {

        let success = (items) => console.log(`Items upserted to Soup: ${items}`)

        let failure = (error) => console.error(`Soup Upsert Error: ${error}`)

        this.smartStore().upsertSoupEntries(this.soupName, results.records, success, failure)
      })

  }

  // End Second Post



  // Third Post

  getAllFromSoup() {
    console.log('getAllFromSoup')

    //indexPath, order, pageSize, selectPaths
    //var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec('Name', 'ascending', 2, ['Name', 'Id'])
    var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec('Name', 'ascending', 50)//, ['Name', 'Id'])
    //var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec('Name', 'decending', 2, ['Name'])
    //var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec('Name')//, 'decending', 2, ['Name'])

    console.log(querySpec)

    const success = (results) => console.log({ results })

    const failure = (error) => console.log(error)

      ; (navigator as sdkNavigator).smartstore.querySoup(this.soupName, querySpec, success, failure)

  }

  // End Third Post



}
