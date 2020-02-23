import {Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterContentChecked {
  title = 'Glaucus';
  showToolBarIfLoggedIn: boolean;

  ngOnInit() {
  }
  ngAfterContentChecked(): void {
    if (localStorage.getItem('idtableUserId')) {
      this.showToolBarIfLoggedIn = true;
    } else {
      this.showToolBarIfLoggedIn = false;
    }
  }
}
