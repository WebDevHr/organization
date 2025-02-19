import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SocialLoginModule, SocialUser, SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { LayoutComponent } from './layout/layout.component';

@Component({
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, SocialLoginModule, GoogleSigninButtonModule, LayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Arca Organization';

  user!: SocialUser;
  loggedIn!: boolean;
  returnUrl: string = "/";


  constructor(private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      if (this.loggedIn) {
        this.authService.googleLogin(this.user.idToken).subscribe((response) => {
          this.authService.setToken(response.access_Token);
          this.authService.setAuthState(response.access_Token);
          this.router.navigateByUrl(this.returnUrl);
        })
      }
    });
  }

}
