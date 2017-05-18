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
import { TabsPage } from '../tabs/tabs';
import { Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage } from '@ionic-native/secure-storage';
import 'rxjs/add/operator/map';
var LoginPage = (function () {
    function LoginPage(navCtrl, http, np, fb, loadingCtrl, toastCtrl, secureStorage) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.np = np;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.secureStorage = secureStorage;
        this.user = '';
        this.password = '';
        this.url = 'http://localhost/dashboard/ionic_php/login.php';
        this.form = fb.group({
            "user": ["", Validators.required],
            "password": ["", Validators.required]
        });
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        this.resetFields();
    };
    LoginPage.prototype.sendLogs = function () {
        var _this = this;
        console.log(this.password);
        console.log(this.user);
        var loader = this.loadingCtrl.create({
            content: "Logging in..."
        });
        loader.present();
        var body = "key=login&user=" + this.user + "&password=" + this.password, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers });
        this.http.post(this.url, body, options)
            .subscribe(function (data) {
            _this.user_info = data.json();
            _this.user_info = _this.user_info[0];
            console.log('user_info');
            console.log(_this.user_info);
            if (_this.user_info !== undefined) {
                loader.dismissAll();
                _this.navCtrl.setRoot(TabsPage);
                _this.sendNotification('Welcome ' + _this.user_info.firstname + ' ' + _this.user_info.lastname + ' !');
                _this.secureStorage.create('store_id')
                    .then(function (storage) {
                    storage.set('user_id', _this.user_info.ID)
                        .then(function (data) { return console.log(data); }, function (error) { return console.log(error); });
                });
            }
            else {
                _this.sendNotification('Wrong infos, try again.');
                loader.dismissAll();
            }
        });
    };
    LoginPage.prototype.setHome = function () {
        this.navCtrl.setRoot(TabsPage);
    };
    LoginPage.prototype.resetFields = function () {
        this.user = "";
        this.password = "";
    };
    LoginPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        notification.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        NavParams,
        FormBuilder,
        LoadingController,
        ToastController,
        SecureStorage])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map