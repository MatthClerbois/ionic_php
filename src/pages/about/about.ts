import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	public items: any=[];

  constructor(	public navCtrl: NavController,
  				public http: Http,
  				private secureStorage: SecureStorage) {

  }

   ionViewWillEnter(){
      this.listItems();
   }

   create_key(){
		this.secureStorage.create('store_id')
	    .then((storage: SecureStorageObject) => {				 
	     	storage.set('user_id','123456789')
	     	  .then(
	     	   data => console.log('hello : '+data),
	     	    error => console.log(error)
	     	);
	  	});
   }

  	listItems(){
      this.http.get('http://localhost/dashboard/ionic_php/get_items.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

   test(item){
   	console.log('comment :'+item.comment);
   }

}
