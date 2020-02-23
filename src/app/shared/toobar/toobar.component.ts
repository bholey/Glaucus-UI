import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toobar',
  templateUrl: './toobar.component.html',
  styleUrls: ['./toobar.component.css']
})
export class ToobarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    if (localStorage.getItem('idtableUserId')) {
      localStorage.removeItem('idtableUserId');
    }
    this.router.navigate(['/login']);
  }
}
