import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { ItemsPage } from '../pages/items/items';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { ProfilePage } from '../pages/profile/profile';
import { MainsysPage } from '../pages/mainsys/mainsys';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserModule } from '@angular/platform-browser';
import { SecureStorage } from '@ionic-native/secure-storage';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ItemHistoryPage } from '../pages/item-history/item-history';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
            HomePage,
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
            HomePage,
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