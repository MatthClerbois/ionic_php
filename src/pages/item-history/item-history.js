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
import { Http } from '@angular/http';
var ItemHistoryPage = (function () {
    function ItemHistoryPage(navCtrl, http, np) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.np = np;
        this.history = [];
    }
    ItemHistoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.http.get('http://localhost/dashboard/ionic_php/get_item_history.php')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.history = data;
        });
    };
    return ItemHistoryPage;
}());
ItemHistoryPage = __decorate([
    Component({
        selector: 'page-item-history',
        templateUrl: 'item-history.html',
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        NavParams])
], ItemHistoryPage);
export { ItemHistoryPage };
//# sourceMappingURL=item-history.js.map