import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NavController, NavParams,ToastController,ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-item-notes',
  templateUrl: 'item-notes.html',
})
export class ItemNotesPage {

	public form : FormGroup;
	public notes: any=[];
	newNote:string='';
	private user_id:number=-999;
 	public item_id:number =this.navParams.get('item_id');
	public url : string  = 'http:///localhost:8080/ionic_php/get_item_note.php';

	constructor(public navCtrl: NavController,
				public http: Http,
				public storage	  : Storage,
				public fb         : FormBuilder,
				public toastCtrl  : ToastController,
				public modalCtrl: ModalController,
				public navParams: NavParams) {
		this.form = fb.group({
					"newNote"                  : ["", Validators.required]
		});

	}

 	sendNotification(message)  : void{
		let notification = this.toastCtrl.create({
				message       : message,
				duration      : 2000,
		});
		notification.present();
 	}

    
    ionViewWillEnter(){
        this.loadNotes();
	 	this.resetFields();
		console.log('ionViewDidLoad NotePage');

    }

    loadNotes(){    	
     	let body     : string   = "key=getNote&item_id="+this.item_id,
				type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
				headers  : any      = new Headers({ 'Content-Type': type}),
				options  : any      = new RequestOptions({ headers: headers });

     	this.http.post(this.url, body, options)
      	.map(res => res.json())
      	.subscribe(data =>
      	{
      	   	this.notes = data;
			this.sendNotification('Click on the field to expand');
      	});
    }
    addNote(){
		console.log('before this.user_id: '+this.user_id);
    	if(this.newNote===''){
			this.sendNotification('Note field is empty');
    	}else{
	  		this.storage.get('user').then((val) => {
    			this.user_id=val.ID;
    			console.log('user_id: '+val.ID+',item_id: '+this.item_id);

    			let body     : string   = "key=newNote&user_id=" + val.ID + "&item_id=" + this.item_id+"&note="+this.newNote,
    						type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
    						headers  : any      = new Headers({ 'Content-Type': type}),
    						options  : any      = new RequestOptions({ headers: headers });

    			this.http.post(this.url, body, options)
    				.subscribe((data) => {
    					console.log('data');
    					console.log(data);
    					console.log('data.json()');
    					console.log(data.json());
    					if(data.json()===true){
							this.sendNotification('Note sent.');    					
			 				this.resetFields();
    					}else{
							this.sendNotification('Error with the request, please contact support');    					
							console.log(data.json());
    					}
    			});

		  	})
    	}    		
    }

 	helpNotification(message): void{
		let notification = this.toastCtrl.create({
				message		: message,
				position	: 'bottom',
				showCloseButton:true,
				closeButtonText: 'Ok',
  				duration: 3000
		});
		notification.present();
		notification.onDidDismiss(() => {
		   console.log('Dismissed toast');
		 });
 	}

	resetFields() : void {
		this.newNote= "";
	}

 	moreInfo(note){ 
 		  let profileModal = this.modalCtrl.create(Note, { text: note });
 		  profileModal.present();
 	}

}

@Component({
	template: `
		<ion-header>
  			<ion-navbar>
			    <ion-title>
			      Note
			    </ion-title>			    
			    <ion-buttons start>
			      <button ion-button (click)="dismiss()">
			        <span ion-text color="primary" showWhen="ios">Previous</span>
			        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
			      </button>
			    </ion-buttons>
  			</ion-navbar>
		</ion-header>
		<ion-content>			
 			<ion-item>
	  	 		<ion-label><h2>User</h2></ion-label>
		  	 	<ion-label>{{note_text?.user}}</ion-label>
  	 		</ion-item>
 			<ion-item>
	  	 		<ion-label><h2>Date</h2></ion-label>
		  	 	<ion-label>{{note_text?.creation | date:"EEEE, dd/MM/yy HH:mm"}}</ion-label>
  	 		</ion-item>
  	 		<ion-card-content>
  	 			<p>{{note_text?.note}}</p>
  	 		</ion-card-content>
		</ion-content>
		`
})
export class Note {
	note_text;

	constructor(public params: NavParams,
    			public viewCtrl: ViewController) {
		this.note_text=params.get('text');
 	}	

	dismiss() {
	    this.viewCtrl.dismiss();
	}

}