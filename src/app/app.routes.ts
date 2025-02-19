import { Routes } from '@angular/router';
import { CreateCorporateComponent } from './components/create-corporate/create-corporate.component';
import { SearchEventWizardComponent } from './components/search-event-wizard/search-event-wizard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CorporatedashboardComponent } from './components/corporatedashboard/corporatedashboard.component';

export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },

{
    path: 'become-a-supplier',
    component: CreateCorporateComponent , canActivate: [AuthGuard]
},
{
    path: 'search-event',
    component: SearchEventWizardComponent
},
{
    path: 'corporate-dashboard',
    component: CorporatedashboardComponent , canActivate: [AuthGuard]
},
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'search-event',
    component: SearchEventWizardComponent
}

];
