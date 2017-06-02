import { Component } from '@angular/core';
import { HistoryPage } from '../history/history';
import { SecureStorage } from '@ionic-native/secure-storage';
import { ItemNotesPage } from '../item-notes/item-notes';
import { Http,Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams,ToastController,LoadingController  } from 'ionic-angular';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {


	public form : FormGroup;
 	private url : string  = 'http://localhost:8080/ionic_php/';
 	private item:any =this.navParams.get('item');
 	public statusList:any=[];
 	public loader = this.loadingCtrl.create({
				content: "Accessing Item's detail ..."
		});

    constructor(	public navCtrl: NavController,
	  				public http: Http,
					public loadingCtrl:LoadingController,
					public toastCtrl  : ToastController,
  					public navParams: NavParams,
               		public fb         : FormBuilder,
					private secureStorage: SecureStorage) {
    	this.getItemInfo();
    	this.getStatusList();
		//this.helpNotification('Click on Grey text (right side) to modify Values');
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
 	getStatusList(){
 		console.log('status: '+this.item.status_id);
 		let body     : string   = "key=status_id&status_id=" + this.item.status_id,
 					type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
 					headers  : any      = new Headers({ 'Content-Type': type}),
 					options  : any      = new RequestOptions({ headers: headers });
 		this.http.post(this.url+'get_item_status.php', body, options)
      	.map(res => res.json())
      	.subscribe(data =>{
 				this.statusList = data;
 				console.log('statusList');
 				console.log(this.statusList);
 				this.loader.dismissAll();     	
 		});
 	}

 	getItemInfo(){
 		let body     : string   = "key=item_detail&item_id=" + this.item.ID,
 					type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
 					headers  : any      = new Headers({ 'Content-Type': type}),
 					options  : any      = new RequestOptions({ headers: headers });
 		this.http.post(this.url+'get_item_detail.php', body, options)
 			.subscribe((data) => {
 				this.item = data.json();
 				this.item=this.item[0];
 				this.loader.dismissAll();     	
 				console.log('this.item');
 				console.log(this.item);
 				this.sendNotification('Selected item n°'+this.item.ID);
 		});
 	}

 	getNotes(){ 		
 		console.log('item_id from item_details: '+this.item.ID);
	  	let payload={'item_id' :this.item.ID};
	  	this.navCtrl.push(ItemNotesPage, payload)
 	}

 	getHistory(){ 		
 		console.log('item_id from item_details: '+this.item.ID);
	  	let payload={'item_id' :this.item.ID};
	  	this.navCtrl.push(HistoryPage, payload)
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
