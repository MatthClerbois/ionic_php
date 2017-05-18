import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController  } from 'ionic-angular';
import {TabsPage } from '../tabs/tabs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	 public form : FormGroup;
	 user : string='';
	 password : string='';
	 private url : string  = 'http://localhost/dashboard/ionic_php/login.php';
	 public user_info:any;

	constructor( public navCtrl    : NavController,
							 public http       : Http,
							 public np         : NavParams,
							 public fb         : FormBuilder,
							 public loadingCtrl:LoadingController,
							 public toastCtrl  : ToastController,
							 private secureStorage: SecureStorage){
		this.form = fb.group({
					"user"                  : ["", Validators.required],
					"password"           : ["", Validators.required]
		});
	}


	ionViewWillEnter(){
		 this.resetFields();
	}

	sendLogs(){
		console.log(this.password);
		console.log(this.user);
		let loader = this.loadingCtrl.create({
				content: "Logging in..."
		});
		loader.present();
		let body     : string   = "key=login&user=" + this.user + "&password=" + this.password,
					type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
					headers  : any      = new Headers({ 'Content-Type': type}),
					options  : any      = new RequestOptions({ headers: headers });

		this.http.post(this.url, body, options)
			.subscribe((data) => {
				this.user_info = data.json();
				this.user_info=this.user_info[0];
				console.log('user_info');
				console.log(this.user_info);
				if(this.user_info!==undefined){
					loader.dismissAll();     	
					this.navCtrl.setRoot(TabsPage);
					this.sendNotification('Welcome '+this.user_info.firstname+' '+this.user_info.lastname+' !');

					this.secureStorage.create('store_id')
				    .then((storage: SecureStorageObject) => {				 
				     	storage.set('user_id',this.user_info.ID)
				     	  .then(
				     	   data => console.log(data),
				     	    error => console.log(error)
				     	);
				  	});
				}else {
					this.sendNotification('Wrong infos, try again.');
					loader.dismissAll();     	
				}

		});
	}

	setHome(){
		this.navCtrl.setRoot(TabsPage);
	}

	resetFields() : void {
		this.user= "";
		this.password= "";
	}

 	sendNotification(message)  : void{
		let notification = this.toastCtrl.create({
				message       : message,
				duration      : 2000
		});
		notification.present();
 	}
}
