import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { ItemDetailPage } from '../item-detail/item-detail';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NavController,NavParams,ToastController,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html'
})
export class ItemsPage {

	public items: any=[];
	public items_tmp: any=[];
 	public user_id:number =this.np.get('user_id');
	public url : string  = 'http:///localhost:8080/ionic_php/get_items.php';
	 

  	constructor(	public navCtrl: NavController,
  					public http: Http,
					public storage	  : Storage,
				 	public np         : NavParams,
  					private secureStorage: SecureStorage) { 
  		this.storage.get('user').then((val) => {
		    console.log('val');
		    console.log(val);
		    this.user_id=val.ID;
	  	}).then(()=>{
		  	console.log(' HOME testvalue : ');
		  	console.log(this.user_id); 
	  	})
  	}

    ionViewWillEnter(){
        this.listItems();
		console.log('ionViewDidLoad Mainsys');
    }


    initializeItems() {
       this.items =this.items_tmp;
     }


   	getItems(ev: any) {
   		this.initializeItems();
   	    let val = ev.target.value;

   	    if (val && val.trim() != '') {
   	      	this.items = this.items.filter((item) => {
				return (item.subject.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
   	    }
   	}

  	listItems(){ 		
    	console.log('ITEMS user_id: '+this.user_id);
     	let body     : string   = "key=login&user_id="+this.user_id,
     				type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
     				headers  : any      = new Headers({ 'Content-Type': type}),
     				options  : any      = new RequestOptions({ headers: headers });

     	this.http.post(this.url, body, options)
      	.map(res => res.json())
      	.subscribe(data =>
      	{
      	   this.items = data;
      	   this.items_tmp=data;
      	});
    }

    itemInfo(item){
	  	let payload={'item' :item};
	  	this.navCtrl.push(ItemDetailPage, payload)
    }

}
