import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import { ContactsServiceProvider } from "../contacts-service/contacts-service";

declare var cordova: any;

interface sdkNavigator extends Navigator {
  smartstore: any;
}

@Injectable()
export class SmartstoreServiceProvider extends ContactsServiceProvider {
  // First post

  private soupName = "contacts";

  private smartStore(): any {
    return cordova.require("com.salesforce.plugin.smartstore");
  }

  constructor() {
    super();

    console.log("constructor");

    const indexSpecs = [
      {
        path: "Name",
        type: "string"
      },
      {
        path: "Id",
        type: "string"
      }
    ];

    let success = soupName => {
      console.log(`Soup ${soupName} was successfully created!`);

      this.fillSoup();
    };

    let failure = error =>
      console.error(`Registering soup fails with error: ${error}`);

    this.smartStore().registerSoup(this.soupName, indexSpecs, success, failure);
  }

  // End First Post

  // Second Post

  fillSoup() {
    console.log("fillSoup");

    return super.loadContacts().then(results => {
      let success = items => console.log(`Items upserted to Soup: ${items}`);

      let failure = error => console.error(`Soup Upsert Error: ${error}`);

      (navigator as sdkNavigator).smartstore.clearSoup(this.soupName, () =>
        this.smartStore().upsertSoupEntries(
          this.soupName,
          results.records,
          success,
          failure
        )
      );
    });
  }

  // End Second Post

  // Third Post

  getAllFromSoup() {
    console.log("getAllFromSoup");

    //indexPath, order, pageSize, selectPaths
    //var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec('Name', 'ascending', 2, ['Name', 'Id'])
    var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec(
      "Name",
      "ascending",
      50
    ); //, ['Name', 'Id'])
    //var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec('Name', 'decending', 2, ['Name'])
    //var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec('Name')//, 'decending', 2, ['Name'])

    console.log(querySpec);

    const success = results => console.log({ results });

    const failure = error => console.log(error);

    (navigator as sdkNavigator).smartstore.querySoup(
      this.soupName,
      querySpec,
      success,
      failure
    );
  }

  // End Third Post

  loadContacts(): Promise<any> {
    console.log("loadContacts");

    return new Promise((resolve, reject) => {
      var querySpec = (navigator as sdkNavigator).smartstore.buildAllQuerySpec(
        "Name",
        "ascending",
        50
      );

      let success = results =>
        resolve({ records: results.currentPageOrderedEntries });

      (navigator as sdkNavigator).smartstore.querySoup(
        this.soupName,
        querySpec,
        success,
        reject
      );
    });
  }

  exactQuery() {
    console.log("getContact");

    let id = "003j0000008CVYlAAO"; //id from soup

    let promise = new Promise((resolve, reject) => {
      var querySpec = (navigator as sdkNavigator).smartstore.buildExactQuerySpec(
        "Id",
        id
      );

      let success = results => {
        console.log(results);
        resolve(results.currentPageOrderedEntries);
        // resolve({ records: [results.currentPageOrderedEntries] });
      };

      (navigator as sdkNavigator).smartstore.querySoup(
        this.soupName,
        querySpec,
        success,
        reject
      );

      promise.then(results => {
        console.log(results);
      });
    });
  }

  // deleteContact(id: string): any {

  // }

  getContact(id: string) {
    console.log("SmartstoreServiceProvider.getContact");

    let promise: Promise<{ records: any[] }> = new Promise(
      (resolve, reject) => {
        var querySpec = (navigator as sdkNavigator).smartstore.buildExactQuerySpec(
          "Id",
          id
        );

        let success = results => {
          console.log(results);

          resolve({ records: results.currentPageOrderedEntries });
        };

        (navigator as sdkNavigator).smartstore.querySoup(
          this.soupName,
          querySpec,
          success,
          reject
        );
      }
    );

    return promise;
  }
}
