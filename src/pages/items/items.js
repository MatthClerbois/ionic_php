var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage } from '@ionic-native/secure-storage';
var ItemsPage = (function () {
    function ItemsPage(navCtrl, http, secureStorage) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.secureStorage = secureStorage;
        this.items = [];
        this.url = 'http://localhost/dashboard/ionic_php/get_items.php';
    }
    ItemsPage.prototype.ionViewWillEnter = function () {
        this.listItems();
    };
    ItemsPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ItemsPage.prototype.listItems = function () {
        var _this = this;
        var body = "key=login&item_id=" + this.item_id, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers });
        this.http.post(this.url, body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.items = data;
        });
    };
    ItemsPage.prototype.itemInfo = function (item_id) {
        var payload = { 'item_id': item_id };
        this.navCtrl.push(ItemDetailPage, payload);
    };
    return ItemsPage;
}());
ItemsPage = __decorate([
    Component({
        selector: 'page-items',
        templateUrl: 'items.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        SecureStorage])
], ItemsPage);
export { ItemsPage };
//# sourceMappingURL=items.js.map