import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { ItemsPage } from '../items/items';
import { ProfilePage } from '../profile/profile';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Component,ViewChild } from '@angular/core';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { IonicPage, NavController, NavParams,ToastController,LoadingController  } from 'ionic-angular';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	//@ViewChild(ProfilePage) test:ProfilePage;
	public form : FormGroup;
	private user : string='';
	private password : string='';
	private user_id:number;
	private url : string  = 'http://localhost:8080/ionic_php/login.php';
	public user_info:any;

	constructor(public navCtrl   : NavController,
				public storage	  : Storage,
				public http       : Http,
				public np         : NavParams,
				public fb         : FormBuilder,
				private splashScreen: SplashScreen,
				public loadingCtrl:LoadingController,
				public toastCtrl  : ToastController,
				private secureStorage: SecureStorage){
		this.form = fb.group({
					"user"                  : ["", Validators.required],
					"password"           : ["", Validators.required]
		});
	}

	ionViewWillEnter(){
		this.splashScreen.show();
	 	this.resetFields();
		this.splashScreen.hide();
	}

	sendLogs(){
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
				if(this.user_info!==undefined){		
					loader.dismissAll();   
					this.navCtrl.setRoot(TabsPage,{'user':this.user_info});
					this.sendNotification('Welcome '+this.user_info.firstname+' '+this.user_info.lastname+' !');
			     	this.storage.set('user',this.user_info);
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
				message     : message,
				position	:'top',
				duration	: 2000
		});
		notification.present();
 	} 
}
