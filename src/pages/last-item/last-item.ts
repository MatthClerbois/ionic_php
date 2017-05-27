import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { ItemDetailPage } from '../item-detail/item-detail';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NavController,NavParams,ToastController,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-last-item',
  templateUrl: 'last-item.html',
})
export class LastItemPage {

	public lastItems: any=[];
 	public user_id:number =this.np.get('user_id');
	public url : string  = 'http:///localhost:8080/ionic_php/get_last_item.php';

  constructor(	public navCtrl: NavController,
				public http: Http,
				public storage	  : Storage,
				public np         : NavParams,
				private secureStorage: SecureStorage) {
  		this.storage.get('user').then((val) => {
		    this.user_id=val.ID;
	  	}).then(()=>{
		  	console.log(' last_item testvalue : ');
		  	console.log(this.user_id); 
	  	})
  }
    ionViewWillEnter(){
        this.getLastItem();
		console.log('');
    }    

  	getLastItem(){ 		
    	console.log('ITEMS user_id: '+this.user_id);
     	let body     : string   = "key=lastItem&user_id="+this.user_id,
     				type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
     				headers  : any      = new Headers({ 'Content-Type': type}),
     				options  : any      = new RequestOptions({ headers: headers });

     	this.http.post(this.url, body, options)
      	.map(res => res.json())
      	.subscribe(data =>
      	{
      	   this.lastItems = data;
      	});
    }


}
