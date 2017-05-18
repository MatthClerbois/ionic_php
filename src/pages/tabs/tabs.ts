import { Component } from '@angular/core';
import { ItemsPage } from '../items/items';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import {MainsysPage } from '../mainsys/mainsys';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ItemsPage;
  tab3Root = ContactPage;
  tab4Root = UserPage;
  tab5Root = MainsysPage;

  constructor() {

  }
}
