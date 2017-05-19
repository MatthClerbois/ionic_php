import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	public profile: any;
	public loader = this.loadingCtrl.create({content: "Logging out..."});

  constructor(	public navCtrl: NavController,
  				public http: Http,
			 	public loadingCtrl:LoadingController,
		 		private secureStorage: SecureStorage) {

  }
  	
   ionViewWillEnter(){
      this.view_profile();
   }

  	view_profile(){
      	this.http.get('http://localhost/dashboard/ionic_php/get_profile.php')
      	.subscribe(data =>
      	{
      	  	this.profile = data.json();
      	  	this.profile=this.profile[0];
      	});
   }

   logout(){
		this.loader.present();
		this.secureStorage.create('store_id')
	    .then((storage: SecureStorageObject) => {				 
	     	storage.clear();
	  	});
    	this.navCtrl.setRoot(LoginPage).then(response=>{
			this.loader.dismissAll();
		});
   }

}
