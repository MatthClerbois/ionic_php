import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html'
})
export class ItemsPage {

	public items: any=[];
	public items_tmp: any=[];
	public item_id:number;
	private url : string  = 'http://localhost/dashboard/ionic_php/get_items.php';
	 

  	constructor(	public navCtrl: NavController,
  					public http: Http,
  					private secureStorage: SecureStorage) {
  	}

    ionViewWillEnter(){
        this.listItems();
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
     
     	let body     : string   = "key=login&item_id="+this.item_id,
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

    itemInfo(item_id){
	  	let payload={'item_id' :item_id};
	  	this.navCtrl.push(ItemDetailPage, payload)
    }

}
