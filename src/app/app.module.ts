import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { ItemsPage } from '../pages/items/items';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { ProfilePage } from '../pages/profile/profile';
import { MainsysPage } from '../pages/mainsys/mainsys';
import { MenuItemPage } from '../pages/menu-item/menu-item';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserModule } from '@angular/platform-browser';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ItemHistoryPage } from '../pages/item-history/item-history';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


@NgModule({
  declarations: [
    MyApp,
    ItemsPage,
    ProfilePage,
    TabsPage,
    UserPage,
    ItemHistoryPage,
    HomePage,
    ItemDetailPage,
    MenuItemPage,
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
    HomePage,
    ItemHistoryPage,
    ItemDetailPage,
    MenuItemPage,
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
