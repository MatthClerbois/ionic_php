import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { ItemDetailPage } from '../item-detail/item-detail';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NavController,NavParams ,ToastController,LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-last-modified',
  templateUrl: 'last-modified.html',
})
export class LastModifiedPage {

	public lastModified: any=[];
	public lastModified_tmp: any=[];
 	public user_id:number =this.np.get('user_id');
	public url : string  = 'http:///localhost:8080/ionic_php/get_last_modified.php';


    constructor(public navCtrl: NavController,
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

    initializeItems() {
       this.lastModified =this.lastModified_tmp;
    }


    ionViewWillEnter(){
          this.getLastItem();
    }    

    toggleNotification(e){    
       let body     : string   = "key=lastModifRange&days="+e._value+ "&user_id="+this.user_id,
         type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
         headers  : any      = new Headers({ 'Content-Type': type}),
         options  : any      = new RequestOptions({ headers: headers });

       this.http.post(this.url, body, options)
        .map(res => res.json())
        .subscribe(data =>
        {
           this.lastModified = data;
           this.lastModified_tmp = data;
        });
    }

   	searchItems(ev: any) {
   		this.initializeItems();
   	    let val = ev.target.value;

   	    if (val && val.trim() != '') {
   	      	this.lastModified = this.lastModified.filter((lastModif) => {
				return (lastModif.subject.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
   	    }
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
      	   this.lastModified = data;
      	   this.lastModified_tmp = data;
      	});
    }
}
