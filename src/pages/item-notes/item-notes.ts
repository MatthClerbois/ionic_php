import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NavController, NavParams,ToastController  } from 'ionic-angular';

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
				public navParams: NavParams) {

	}
    
    ionViewWillEnter(){
        this.loadNotes();
		console.log('ionViewDidLoad Mainsys');

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
	      	if(this.notes.length>0){
		      	console.log('notes not null');
		      	console.log(this.notes);

	      	}else {
		      	console.log('notes null');
		      	console.log(this.notes);
	  		}
      	});
    }

 	helpNotification(message): void{
		let notification = this.toastCtrl.create({
				message		: message,
				position	: 'bottom',
				showCloseButton:true,
				closeButtonText: 'Ok'
		});
		notification.present();
		notification.onDidDismiss(() => {
		   console.log('Dismissed toast');
		 });
 	}

 	moreInfo(note){ 		
		this.helpNotification('Created by '+note.user+', the '+note.creation);
 	}

}
