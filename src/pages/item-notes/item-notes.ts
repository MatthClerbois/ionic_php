import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NavController, NavParams,ToastController,ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-item-notes',
  templateUrl: 'item-notes.html',
})
export class ItemNotesPage {

	public notes: any=[];
 	public item_id:number =this.navParams.get('item_id');
	public url : string  = 'http:///localhost:8080/ionic_php/get_item_note.php';

	constructor(public navCtrl: NavController,
				public http: Http,
				public storage	  : Storage,
				public toastCtrl  : ToastController,
				public modalCtrl: ModalController,
				public navParams: NavParams) {

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
		console.log('ionViewDidLoad NotePage');

    }

    loadNotes(){    	
     	let body     : string   = "key=note&item_id="+this.item_id,
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
		  	 	<ion-label>{{note_text?.creation}}</ion-label>
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