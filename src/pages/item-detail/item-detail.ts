import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController  } from 'ionic-angular';
import { Http,Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { LoginPage } from '../../login/login';
import { ItemsPage } from '../../items/items';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {


	public form : FormGroup;
	public item : any=[];
 	private url : string  = 'http://localhost/dashboard/ionic_php/get_item_detail.php';
 	private item_id:number =this.navParams.get('item_id');
 	public loader = this.loadingCtrl.create({
				content: "Logging in..."
		});

    constructor(	public navCtrl: NavController,
	  				public http: Http,
					public loadingCtrl:LoadingController,
					public toastCtrl  : ToastController,
  					public navParams: NavParams,
               		public fb         : FormBuilder,
					private secureStorage: SecureStorage) {
		this.helpNotification('Click on Grey text (right side) to modify Values');
		this.form = fb.group({
		   "subject"                  	: ["", Validators.required],
		   "comment"                  	: ["", Validators.required],
		   "status"                  	: ["", Validators.required],
		   "user"                  		: ["", Validators.required],
		   "category"                  	: ["", Validators.required],
		   "workflow"                  	: ["", Validators.required]
		});
    }
  
    ionViewDidLoad() {
      	console.log('ItemDetail loaded');
	    let body     : string   = "key=item_detail&item_id=" + this.item_id,
	    			type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
	    			headers  : any      = new Headers({ 'Content-Type': type}),
	    			options  : any      = new RequestOptions({ headers: headers });
	    this.http.post(this.url, body, options)
	    	.subscribe((data) => {
	    		this.item = data.json();
	    		this.item=this.item[0];
	    		console.log(this.item);
	    		this.loader.dismissAll();     	
	    		this.sendNotification('Selected item n°'+this.item.ID);
	    });
    }
  
    openPage(page){
    	this.navCtrl.setRoot(page.component);
    }
  
 	sendNotification(message)  : void{
		let notification = this.toastCtrl.create({
				message       : message,
				duration      : 2000,
		});
		notification.present();
 	}

 	helpNotification(message): void{
		let notification = this.toastCtrl.create({
				message		: message,
				position	: 'top',
				showCloseButton:true,
				closeButtonText: 'Got It!'
		});
		notification.present();
		notification.onDidDismiss(() => {
		   console.log('Dismissed toast');
		 });
 	}
}
