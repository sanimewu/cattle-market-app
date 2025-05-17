import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NzButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router:Router) {}
  logOut() {
    this.authService.googleSignOut().subscribe({
      next: () => {
        this.router.navigate(['login']).then();
      }
    })
  }
}
