import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

	public users: any=[];

  constructor(	public navCtrl: NavController,
  				public http: Http) {

  }

   ionViewWillEnter()
   {
      this.listUsers();
   }

  	listUsers(){
      this.http.get('http://localhost:8080/ionic_php/get_users.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.users = data;
      });
   }

    test(user){
	   	console.log('mail :'+user.email);
	   	console.log('date creation :'+user.date_creation);
    } 

}
