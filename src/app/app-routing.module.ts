import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ActivityComponent } from './activity/activity.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'upload', component: UploadComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
