import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { NavParams,NavController  } from 'ionic-angular';


@Component({
  selector: 'pagehome',
  templateUrl: 'home.html'
})
export class HomePage {

   public items : any = [];
   private testValue:any;
   constructor(	public navCtrl: NavController,
				public storage: Storage,
               	public http   : Http){
   }

   ionViewWillEnter() {
      this.load();
   }

   // Retrieve the JSON encoded data from the remote server
   // Using Angular's Http class and an Observable  then
   // assign this to the items array for rendering to the HTML template
   load(){
      this.http.get('http://localhost:8080/ionic_php/retrieve-data.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }


   // Allow navigation to the AddTechnology page for creating a new entry
   addEntry(){
      this.navCtrl.push('AddTechnology');
   }

   	

	 test(){
		this.storage.get('user').then((val) => {
		    console.log('val');
		    console.log(val);
		    this.testValue=val;
	  	}).then(()=>{
		  	console.log(' HOME testvalue : ');
		  	console.log(this.testValue); 
	  	})
	}


   // Allow navigation to the AddTechnology page for amending an existing entry
   // (We supply the actual record to be amended, as this method's parameter,
   // to the AddTechnology page
   viewEntry(param){
      this.navCtrl.push('AddTechnology', param);
   }


} 