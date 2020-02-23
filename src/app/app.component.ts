import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Glaucus';
  showToolBarIfLoggedIn = false;

  ngOnInit() {
    if (localStorage.getItem('idtableUserId')) {
      this.showToolBarIfLoggedIn = true;
    }
  }
}
