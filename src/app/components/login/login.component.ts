import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    TabViewModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  /**
   *
   */
  constructor(private notification: NotificationService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  activeTab: 'login' | 'register' = 'login';
  returnUrl: string = "/";

  // Login form
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // Register form
  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: this.passwordsMatchValidator });

  // Validator to check if passwords match
  private passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log("return url", this.returnUrl);
  }

  // Utility to get form control for error handling
  getControl(form: FormGroup, controlName: string): AbstractControl | null {
    return form.get(controlName);
  }

  // Login form submission
  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.setToken(response.access_Token);
          this.authService.setAuthState(response.access_Token);
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          this.notification.showError(error);
        }
      });
    }
  }

  // Register form submission
  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Register data:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.notification.showSuccess('Registration successful!');
          this.activeTab = 'login';
          this.loginForm.value.username = this.registerForm.value.email;
        },
        error: (error) => {
          this.notification.showError(error);
        }
      });
    }
  }
}
