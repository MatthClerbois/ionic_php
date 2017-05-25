import { Component } from '@angular/core';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {


	public historys: any=[];
 	public item_id:number =this.navParams.get('item_id');
	public url : string  = 'http:///localhost:8080/ionic_php/get_history.php';

  constructor(public navCtrl: NavController,
				public http: Http,
				public storage	  : Storage,
				public navParams: NavParams) {
  }

    ionViewWillEnter(){
        this.loadHistory();
		console.log('ionViewDidLoad histroyPage');

    }
  	loadHistory(){    	
     	let body     : string   = "key=history&item_id="+this.item_id,
				type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
				headers  : any      = new Headers({ 'Content-Type': type}),
				options  : any      = new RequestOptions({ headers: headers });

     	this.http.post(this.url, body, options)
      	.map(res => res.json())
      	.subscribe(data =>
      	{
      	   	this.historys = data;
      	});
    }


}
