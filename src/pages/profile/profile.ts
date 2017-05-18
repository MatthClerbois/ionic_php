import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	public profile: any;

  constructor(	public navCtrl: NavController,
  				public http: Http) {

  }

   ionViewWillEnter()
   {
      this.view_profile();
   }

  	view_profile(){
      	this.http.get('http://localhost/dashboard/ionic_php/get_profile.php')
      	.subscribe(data =>
      	{
      	  	this.profile = data.json();
      	  	this.profile=this.profile[0];
      	});
   }

}
