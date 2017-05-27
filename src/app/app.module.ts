import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { ItemsPage } from '../pages/items/items';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { HistoryPage } from '../pages/history/history';
import { ProfilePage } from '../pages/profile/profile';
import { MainsysPage } from '../pages/mainsys/mainsys';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LastItemPage } from '../pages/last-item/last-item';
import { LastModifiedPage } from '../pages/last-modified/last-modified';
import { SecureStorage } from '@ionic-native/secure-storage';
import { BrowserModule } from '@angular/platform-browser';
import { ItemNotesPage } from '../pages/item-notes/item-notes';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    TabsPage,
    UserPage,
    HistoryPage,
    ItemsPage,
    LastModifiedPage,
    ItemNotesPage,
    ItemDetailPage,
    LastItemPage,
    MainsysPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemsPage,
    ProfilePage,
    LastItemPage,
    HistoryPage,
    LastModifiedPage,
    ItemNotesPage,
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
