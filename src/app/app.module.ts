import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ContactsPageModule } from '../pages/contacts/contacts.module';
import { ContactDetailsPageModule } from '../pages/contact-details/contact-details.module';
import { ContactEditPageModule } from '../pages/contact-edit/contact-edit.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactsServiceProvider } from '../providers/contacts-service/contacts-service';
import { SmartstoreServiceProvider } from '../providers/smartstore-service/smartstore-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    ContactsPageModule,
    ContactDetailsPageModule,
    ContactEditPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmailComposer,
    ContactsServiceProvider,
    SmartstoreServiceProvider
  ]
})
export class AppModule { }
