import { UserPage } from '../user/user';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { ItemsPage } from '../items/items';
import { MainsysPage } from '../mainsys/mainsys';
import { ProfilePage } from '../profile/profile';
import { LastModifiedPage } from '../last-modified/last-modified';
import { LastItemPage } from '../last-item/last-item';
import { NavParams,NavController  } from 'ionic-angular';


@Component({
  	templateUrl: 'tabs.html'
})

export class TabsPage {
	private user:any=[] =this.navParams.get('user');

  	tab1Root = ProfilePage;
  	tab2Root = ItemsPage;
  	tab3Root = LastModifiedPage;
  	tab4Root = MainsysPage;
    tab5Root = LastItemPage;
	
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
