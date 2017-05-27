import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NavController,NavParams,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	public profile: any;
	public loader = this.loadingCtrl.create({content: "Logging out..."});  
  	public user_id:number =this.np.get('user_id');
  	public url : string  = 'http:///localhost:8080/ionic_php/get_profile.php';

  constructor(	public navCtrl: NavController,
  				public http: Http,
          		public storage    : Storage,
          		public np         : NavParams,
  			 	public loadingCtrl:LoadingController,
  		 		private secureStorage: SecureStorage) {
  		this.storage.get('user').then((val) => {
		    console.log('val');
		    console.log(val);
		    this.user_id=val.ID;
	  	}).then(()=>{
		  	console.log(' profile testvalue : ');
		  	console.log(this.user_id); 
	  	})
  }
  	
   ionViewWillEnter(){
      this.view_profile();
   }

  	view_profile(){    
      console.log('ITEMS user_id: '+this.user_id);
       let body     : string   = "key=profile&user_id="+this.user_id,
             type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
             headers  : any      = new Headers({ 'Content-Type': type}),
             options  : any      = new RequestOptions({ headers: headers });

       this.http.post(this.url, body, options)
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
