import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { App,NavController,NavParams,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	public profile: any;
	public loader = this.loadingCtrl.create({content: "Logging out..."});  
  	public url : string  = 'http:///localhost:8080/ionic_php/get_profile.php';

  constructor(	public navCtrl: NavController,
  				public http: Http,
                public app : App,
          		public storage    : Storage,
          		public np         : NavParams,
  			 	public loadingCtrl:LoadingController,
  		 		private secureStorage: SecureStorage) {
  		this.storage.get('user').then((val) => {
            this.profile=val;
	  	})
  }
  	
   logout(){

        this.loader.present();
        this.secureStorage.create('store_id')
        .then((storage: SecureStorageObject) => {                 
             storage.clear();
          });
        this.app.getRootNav().setRoot(LoginPage).then(response=>{
            this.loader.dismissAll();
        });
   }
}
