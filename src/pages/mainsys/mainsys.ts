import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Component({
  selector: 'page-mainsys',
  templateUrl: 'mainsys.html',
})
export class MainsysPage {
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private secureStorage: SecureStorage) {
	}	

	ionViewDidLoad() {
		console.log('ionViewDidLoad Mainsys');
	}	

	test(){	
		this.secureStorage.create('store_id')
	    .then((storage: SecureStorageObject) => {				 
	     	storage.get('user_id')
	     	  .then(
	     	   data => console.log(data),
	     	    error => console.log(error)
	     	);
	  	});
	}
}
