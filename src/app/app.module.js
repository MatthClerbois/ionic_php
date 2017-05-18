var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ItemsPage } from '../pages/items/items';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { MainsysPage } from '../pages/mainsys/mainsys';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ItemHistoryPage } from '../pages/item-history/item-history';
import { SecureStorage } from '@ionic-native/secure-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            ItemsPage,
            ProfilePage,
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
            ProfilePage,
            ItemHistoryPage,
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
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map