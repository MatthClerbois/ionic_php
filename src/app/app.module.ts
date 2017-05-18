import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { ItemsPage } from '../pages/items/items';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { MainsysPage } from '../pages/mainsys/mainsys';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ItemHistoryPage } from '../pages/item-history/item-history';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ItemsPage,
    ContactPage,
    HomePage,
    TabsPage,
    UserPage,
    ItemHistoryPage,
    ItemDetailPage,
    MainsysPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemsPage,
    ContactPage,
    ItemHistoryPage,
    HomePage,
    ItemDetailPage,
    TabsPage,
    UserPage,
    MainsysPage,
    LoginPage
  ],
  providers: [
    SecureStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
