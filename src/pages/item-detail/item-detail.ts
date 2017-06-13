import { Component } from '@angular/core';
import { HistoryPage } from '../history/history';
import { SecureStorage } from '@ionic-native/secure-storage';
import { ItemNotesPage } from '../item-notes/item-notes';
import { Http,Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams,ToastController,LoadingController,AlertController   } from 'ionic-angular';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {


	public form : FormGroup;
 	private url : string  = 'http://localhost:8080/ionic_php/';
 	private item:any =this.navParams.get('item');
 	public custom_fields:any=[];
 	private newUser:number;
 	public item_detail:any=[];
 	public statusList:any=[];
 	public users:any=[];
 	public loader = this.loadingCtrl.create({
				content: "Accessing Item's detail ..."
		});

    constructor(	public navCtrl: NavController,
	  				public http: Http,
					public loadingCtrl:LoadingController,
					public toastCtrl  : ToastController,
  					public navParams: NavParams,
               		public fb         : FormBuilder,
               		public alertCtrl: AlertController,
					private secureStorage: SecureStorage) {
    	this.getItemInfo();
    	//this.getStatusList();
    	this.getUsers();
		//this.helpNotification('Click on Grey text (right side) to modify Values');
		this.form = fb.group({
		   "subject"                  	: ["", Validators.required],
		   "comment"                  	: ["", Validators.required],
		   "status"                  	: ["", Validators.required],
		   "user"                  		: ["", Validators.required],
		   "newUser"					: ["", Validators.required],
		   "category"                  	: ["", Validators.required],
		   "count"                  	: ["", Validators.required],
		   "workflow"                  	: ["", Validators.required]
		});	
    }
  
    ionViewDidLoad() {
      	console.log('ItemDetail loaded');
	    
    }
  
    openPage(page){
    	this.navCtrl.setRoot(page.component);
    }

    saveEntry(){
    	//sending modification to server later
    }

    confirmNewUser(){
       let confirm = this.alertCtrl.create({
         title: 'Confirm the new User ?',
         message: 'Are you sure ? You will no longer have access to this item after assigning it to someone else.',
         buttons: [
           {
             text: 'Cancel',
             handler: () => {
               console.log('Disagree clicked');
             }
           },
           {
             text: 'Confirm',
             handler: () => {
             	this.assignUser();
             }
           }
         ]
       });
       confirm.present();
     }
  
 	sendNotification(message)  : void{
		let notification = this.toastCtrl.create({
				message       : message,
				duration      : 2000,
		});
		notification.present();
 	}

	assignUser(){
		console.log('assigning user ..');
		console.log('user id '+this.newUser);
		console.log('item id '+this.item.ID);
		let loader = this.loadingCtrl.create({
				content: "Assigning new user .."
		});
		loader.present();
		let body     : string   ="key=newUser&user_id=" + this.newUser+"&item_id=" + this.item.ID,
					type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
					headers  : any      = new Headers({ 'Content-Type': type}),
					options  : any      = new RequestOptions({ headers: headers });

		this.http.post(this.url+'get_users.php', body, options)
			.subscribe((data) => {	
					console.log('data');
					console.log(data);
					console.log('data.json()');
					console.log(data.json());
					if(data.json()===true){
						this.sendNotification('User assigned successfully');
					}else{
						this.sendNotification('Error while assigning user. Please try again or contact support');
						console.log('user not assigned');
					}		
					loader.dismissAll();     	
			});
	}
	/*
 	getStatusList(){
 		console.log('status: '+this.item.status_id);
 		let body     : string   = "key=status&status_id=" + this.item.status_id,
 					type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
 					headers  : any      = new Headers({ 'Content-Type': type}),
 					options  : any      = new RequestOptions({ headers: headers });
 		this.http.post(this.url+'get_item_status.php', body, options)
      	.map(res => res.json())
      	.subscribe(data =>{
 				this.statusList = data;
 				console.log('statusList');
 				console.log(this.statusList);
 		});
 	}*/

 	getUsers(){
 		console.log('status: '+this.item.status_id);
 		let body     : string   = "key=getUsers",
 					type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
 					headers  : any      = new Headers({ 'Content-Type': type}),
 					options  : any      = new RequestOptions({ headers: headers });
 		this.http.post(this.url+'get_users.php', body, options)
      	.map(res => res.json())
      	.subscribe(data =>{
 				this.users = data;
 				console.log('users');
 				console.log(this.users);
 		});
 	}

 	moreInfo(text){
		this.sendNotification(text);
		console.log(text);
 	}

 	getItemInfo(){
    	let loader = this.loadingCtrl.create({
				content: "Logging in..."
		});
		loader.present();
 		let body     : string   = "key=detail&item_id=" + this.item.ID,
 					type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
 					headers  : any      = new Headers({ 'Content-Type': type}),
 					options  : any      = new RequestOptions({ headers: headers });
 		this.http.post(this.url+'get_item_detail.php', body, options)
 			.subscribe((data) => {
 				console.log('data');
 				console.log(data);
 				this.item_detail=data.json().item[0];
 				this.custom_fields=data.json().custom_fields;
				loader.dismissAll();   
 				this.sendNotification('Click on the field to expand');
 			}
 		);
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
 	test(user){
 		console.log("test");
 		console.log(user.lastname);
 		console.log(user.firstname);
 		console.log(user.login);
 	}
}
