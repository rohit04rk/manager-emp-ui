import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean
  name: string

  constructor(private token: TokenService) {
    if (token.isLoggedIn()) {

    }
  }

  ngOnInit() {
    this.token.isLoggedIn().subscribe(
      res => {
        if (res) {
          this.isLoggedIn = true;
          this.name = this.token.getName()
        } else {
          this.isLoggedIn = false;
        }
      }
    )
  }

  logout() {
    this.isLoggedIn = false
    this.token.logout()
  }

}
