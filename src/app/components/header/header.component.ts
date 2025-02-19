import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule

 } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  standalone:true,
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  firstName = '';
  lastName = '' ;
  authSubscription!: Subscription;

  /**
   *
   */
  constructor(private authService: AuthService,private router:Router) {
    
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthState().subscribe(authState => {
      console.log("Auth state", authState);
      if (authState) {
        this.firstName = authState.FirstName;
        this.lastName = authState.LastName;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.firstName = '';
        this.lastName = '';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
