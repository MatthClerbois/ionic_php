import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	public items: any=[];

  constructor(	public navCtrl: NavController,
  				public http: Http) {

  }

   ionViewWillEnter()
   {
      this.listItems();
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
