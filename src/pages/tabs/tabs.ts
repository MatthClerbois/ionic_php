import { UserPage } from '../user/user';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { ItemsPage } from '../items/items';
import { MainsysPage } from '../mainsys/mainsys';
import { ProfilePage } from '../profile/profile';
import { NavParams,NavController  } from 'ionic-angular';


@Component({
  	templateUrl: 'tabs.html'
})

export class TabsPage {
	private user:any=[] =this.navParams.get('user');

  	tab1Root = HomePage;
  	tab2Root = ProfilePage;
  	tab3Root = UserPage;
  	tab4Root = MainsysPage;
    tab5Root = ItemsPage;
	
  	constructor(public navParams	: NavParams,
  				public navCtrl    	: NavController){
  	}

  	test(){
  		console.log('tetst');
  	}

  	transferInfos(){
	  	this.navCtrl.push(ProfilePage,{'user_id' :this.user.ID});
  	}
}
