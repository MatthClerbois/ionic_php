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
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var ProfilePage = (function () {
    function ProfilePage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
    }
    ProfilePage.prototype.ionViewWillEnter = function () {
        this.view_profile();
    };
    ProfilePage.prototype.view_profile = function () {
        var _this = this;
        this.http.get('http://localhost/dashboard/ionic_php/get_profile.php')
            .subscribe(function (data) {
            _this.profile = data.json();
            _this.profile = _this.profile[0];
        });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map