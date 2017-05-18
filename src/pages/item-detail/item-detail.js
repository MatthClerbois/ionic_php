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
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage } from '@ionic-native/secure-storage';
var ItemDetailPage = (function () {
    function ItemDetailPage(navCtrl, http, loadingCtrl, toastCtrl, navParams, secureStorage) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.secureStorage = secureStorage;
        this.item = [];
        this.url = 'http://localhost/dashboard/ionic_php/get_item_detail.php';
        this.item_id = this.navParams.get('item_id');
        this.loader = this.loadingCtrl.create({
            content: "Logging in..."
        });
        //this.loader.present();
    }
    ItemDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ItemDetail loaded');
        var body = "key=item_detail&item_id=" + this.item_id, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers });
        this.http.post(this.url, body, options)
            .subscribe(function (data) {
            _this.item = data.json();
            _this.item = _this.item[0];
            console.log(_this.item);
            _this.loader.dismissAll();
            _this.sendNotification('Selected item n°' + _this.item.ID);
        });
    };
    ItemDetailPage.prototype.openPage = function (page) {
        this.navCtrl.setRoot(page.component);
    };
    ItemDetailPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        notification.present();
    };
    return ItemDetailPage;
}());
ItemDetailPage = __decorate([
    Component({
        selector: 'page-item-detail',
        templateUrl: 'item-detail.html',
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        LoadingController,
        ToastController,
        NavParams,
        SecureStorage])
], ItemDetailPage);
export { ItemDetailPage };
//# sourceMappingURL=item-detail.js.map