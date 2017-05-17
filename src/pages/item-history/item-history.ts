import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-item-history',
  templateUrl: 'item-history.html',
})
export class ItemHistoryPage {
	public history:any=[];

    constructor(public navCtrl    : NavController,
			 	public http       : Http,
			 	public np         : NavParams) {
    } 

  ionViewDidLoad() {
  	this.http.get('http://localhost/dashboard/ionic_php/get_item_history.php')
	    .map(res => res.json())
	    .subscribe(data =>
	    {
	       this.history = data;
  	});
  }

}
