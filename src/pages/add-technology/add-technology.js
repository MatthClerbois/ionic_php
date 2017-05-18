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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
var AddTechnology = (function () {
    // Initialise module classes
    function AddTechnology(navCtrl, http, NP, fb, toastCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.NP = NP;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        // Flag to be used for checking whether we are adding/editing an entry
        this.isEdited = false;
        // Flag to hide the form upon successful completion of remote operation
        this.hideForm = false;
        // Property to store the recordID for when an existing entry is being edited
        this.recordID = null;
        this.baseURI = 'http://localhost/dashboard/ionic_php/';
        // Create form builder validation rules
        this.form = fb.group({
            "name": ["", Validators.required],
            "description": ["", Validators.required]
        });
    }
    // Determine whether we adding or editing a record
    // based on any supplied navigation parameters
    AddTechnology.prototype.ionViewWillEnter = function () {
        this.resetFields();
        if (this.NP.get("record")) {
            this.isEdited = true;
            this.selectEntry(this.NP.get("record"));
            this.pageTitle = 'Amend entry';
        }
        else {
            this.isEdited = false;
            this.pageTitle = 'Create entry';
        }
    };
    // Assign the navigation retrieved data to properties
    // used as models on the page's HTML form
    AddTechnology.prototype.selectEntry = function (item) {
        this.technologyName = item.name;
        this.technologyDescription = item.description;
        this.recordID = item.id;
    };
    // Save a new record that has been added to the page's HTML form
    // Use angular's http post method to submit the record data
    // to our remote PHP script (note the body variable we have created which
    // supplies a variable of key with a value of create followed by the key/value pairs
    // for the record data
    AddTechnology.prototype.createEntry = function (name, description) {
        var _this = this;
        var body = "key=create&name=" + name + "&description=" + description, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php";
        this.http.post(url, body, options)
            .subscribe(function (data) {
            // If the request was successful notify the user
            if (data.status === 200) {
                _this.hideForm = true;
                _this.sendNotification("Congratulations the technology: " + name + " was successfully added");
            }
            else {
                _this.sendNotification('Something went wrong!');
            }
        });
    };
    // Update an existing record that has been edited in the page's HTML form
    // Use angular's http post method to submit the record data
    // to our remote PHP script (note the body variable we have created which
    // supplies a variable of key with a value of update followed by the key/value pairs
    // for the record data
    AddTechnology.prototype.updateEntry = function (name, description) {
        var _this = this;
        var body = "key=update&name=" + name + "&description=" + description + "&recordID=" + this.recordID, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php";
        this.http.post(url, body, options)
            .subscribe(function (data) {
            // If the request was successful notify the user
            if (data.status === 200) {
                _this.hideForm = true;
                _this.sendNotification("Congratulations the technology: " + name + " was successfully updated");
            }
            else {
                _this.sendNotification('Something went wrong!');
            }
        });
    };
    // Remove an existing record that has been selected in the page's HTML form
    // Use angular's http post method to submit the record data
    // to our remote PHP script (note the body variable we have created which
    // supplies a variable of key with a value of delete followed by the key/value pairs
    // for the record ID we want to remove from the remote database
    AddTechnology.prototype.deleteEntry = function () {
        var _this = this;
        var name = this.form.controls["name"].value, body = "key=delete&recordID=" + this.recordID, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php";
        this.http.post(url, body, options)
            .subscribe(function (data) {
            // If the request was successful notify the user
            if (data.status === 200) {
                _this.hideForm = true;
                _this.sendNotification("Congratulations the technology: " + name + " was successfully deleted");
            }
            else {
                _this.sendNotification('Something went wrong!');
            }
        });
    };
    // Handle data submitted from the page's HTML form
    // Determine whether we are adding a new record or amending an
    // existing record
    AddTechnology.prototype.saveEntry = function () {
        var name = this.form.controls["name"].value, description = this.form.controls["description"].value;
        if (this.isEdited) {
            this.updateEntry(name, description);
        }
        else {
            this.createEntry(name, description);
        }
    };
    // Clear values in the page's HTML form fields
    AddTechnology.prototype.resetFields = function () {
        this.technologyName = "";
        this.technologyDescription = "";
    };
    // Manage notifying the user of the outcome
    // of remote operations
    AddTechnology.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    return AddTechnology;
}());
AddTechnology = __decorate([
    IonicPage(),
    Component({
        selector: 'page-add-technology',
        templateUrl: 'add-technology.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        NavParams,
        FormBuilder,
        ToastController])
], AddTechnology);
export { AddTechnology };
//# sourceMappingURL=add-technology.js.map