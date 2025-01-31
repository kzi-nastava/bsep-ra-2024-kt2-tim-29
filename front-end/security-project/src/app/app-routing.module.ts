import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationRequestsComponent } from './administrator/registration-requests/registrationRequests.component';
import { AdministratorProfileComponent } from './administrator/administrator-profile/administratorProfile.component';
import { AllEmployeesComponent } from './administrator/all-employees/allEmployees.component';
import { AllClientsComponent } from './administrator/all-clients/allClients.component';
import { LoginComponent } from './login/login.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { EditClientProfileComponent } from './edit-client-profile/edit-client-profile.component';
import { AdRequestFormComponent } from './ad-request-form/ad-request-form.component';
import { AllAdRequestsComponent } from './all-ad-requests/all-ad-requests.component';
import { AdFormComponent } from './ad-form/ad-form.component';
import { AllAdsComponent } from './all-ads/all-ads.component';
import { AllClientAdsComponent } from './all-client-ads/all-client-ads.component';
import { AuthGuard } from './service/authGuard.service';
import { HomePageComponent } from './homepage/homepage.component';
import { PermissionsManipulationComponent } from './administrator/permissions-manipulation/permissionsManipulation.component';
import { ClientHomepageComponent } from './client-homepage/client-homepage.component';
import { NotificationComponent } from './notification/notification.component';
import { AllUsersComponent } from './administrator/all-users/all-users.component';
import { ResetPasswordComponent } from './administrator/reset-password/reset-password.component';

const routes: Routes = [
  {path:'registration', component: RegistrationComponent},
  {path:'registrationRequests', component: RegistrationRequestsComponent},
  {path:'administratorProfile', component: AdministratorProfileComponent},
  {path: 'allEmployees', component: AllEmployeesComponent, canActivate: [AuthGuard] },
  {path:'allClients', component: AllClientsComponent},
  {path:'', component: LoginComponent},
  { path: 'login', component: PasswordlessLoginComponent },
  { path: 'client-profile', component: ClientProfileComponent},
  { path: 'edit-client-profile/:email', component: EditClientProfileComponent },
  { path: 'ad-request-form', component: AdRequestFormComponent},
  { path: 'ad-requests', component: AllAdRequestsComponent},
  { path: 'ad-form/:id', component: AdFormComponent},
  { path: 'ads', component: AllAdsComponent},
  { path: 'client-ads', component: AllClientAdsComponent},
  { path: 'homepage', component: HomePageComponent},
  { path: 'permissionsManipulation', component: PermissionsManipulationComponent},
  { path: 'client-homepage/:email', component: ClientHomepageComponent},
  { path: 'notifications', component: NotificationComponent}, //kako da dodam u meni ?? 
  { path: 'allUsers', component: AllUsersComponent},
  { path: 'resetPassword/:email', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
