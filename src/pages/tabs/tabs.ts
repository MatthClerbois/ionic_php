import { Component } from '@angular/core';
import { ItemsPage } from '../items/items';
import { ProfilePage } from '../profile/profile';
import { UserPage } from '../user/user';
import {MainsysPage } from '../mainsys/mainsys';


@Component({
  	templateUrl: 'tabs.html'
})

export class TabsPage {

  	tab1Root = ItemsPage;
  	tab2Root = ProfilePage;
  	tab3Root = UserPage;
  	tab4Root = MainsysPage;
	
  	constructor() {
	
  	}
}
