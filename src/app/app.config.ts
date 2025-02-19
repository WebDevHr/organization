import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('26962039816-ghdg6n9usgjt3pvbjneca5p6ujmugh5e.apps.googleusercontent.com'),
          },
        ],
        onError: (err) => console.error(err),
      } as SocialAuthServiceConfig,
    },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    provideToastr({ // Toastr genel ayarları
      timeOut: 3000, // Bildirim süresi (ms)
      positionClass: 'toast-top-right', // Bildirim pozisyonu
      preventDuplicates: true, // Aynı mesajın tekrarını engelleme
    }),]
};
