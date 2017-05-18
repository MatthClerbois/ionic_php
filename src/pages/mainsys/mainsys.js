var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SecureStorage } from '@ionic-native/secure-storage';
var MainsysPage = (function () {
    function MainsysPage(navCtrl, navParams, secureStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.secureStorage = secureStorage;
    }
    MainsysPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Mainsys');
    };
    MainsysPage.prototype.test = function () {
        this.secureStorage.create('store_id')
            .then(function (storage) {
            storage.get('user_id')
                .then(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        });
    };
    return MainsysPage;
}());
MainsysPage = __decorate([
    Component({
        selector: 'page-mainsys',
        templateUrl: 'mainsys.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        SecureStorage])
], MainsysPage);
export { MainsysPage };
//# sourceMappingURL=mainsys.js.map