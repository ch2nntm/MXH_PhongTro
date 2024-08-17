import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostManagementComponent } from './components/post-management/post-management.component';
import { ApproveLandlordApplicationComponent } from './components/approve-landlord-application/approve-landlord-application.component';
import { RentRoomComponent } from './components/rent-room/rent-room.component';
import { RoommateSearchComponent } from './components/roommate-search/roommate-search.component';
import { NewsComponent } from './components/news/news.component';
import { HomepagemainComponent } from './components/homepagemain/homepagemain.component';
import { UIAdminComponent } from './components/uiadmin/uiadmin.component';
import { UIUserComponent } from './components/uiuser/uiuser.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ChangePasswordContentComponent } from './components/change-password-content/change-password-content.component';
import { EditProfileContentComponent } from './components/edit-profile-content/edit-profile-content.component';
import { FindRoommateComponent } from './components/find-roommate/find-roommate.component';
import { NewListContentComponent } from './components/new-list-content/new-list-content.component';
import { RegisterOwnerContentComponent } from './components/register-owner-content/register-owner-content.component';
import { RoommateSearchDetailComponent } from './components/roommate-search-detail/roommate-search-detail.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/authguard/authguardservice.guard';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'uiuser', component: UIUserComponent, canActivate:[AuthGuardService], children:[
    { path: 'rent-room', component: RentRoomComponent},
    { path: 'roommate-search', component: RoommateSearchComponent},
    { path: 'news', component: NewsComponent},
    { path: 'homepage', component: HomepagemainComponent, canActivate:[AuthGuardService]},
    { path: 'edituser', component: EditUserComponent, children:[
      { path: 'post-for-roommate', component: FindRoommateComponent },
      { path: 'edit-profile', component: EditProfileContentComponent },
      { path: 'change-password', component: ChangePasswordContentComponent },
      { path: 'news-list', component: NewListContentComponent },
      { path: 'register-owner', component: RegisterOwnerContentComponent },
    ] },
  ]},
  { path: 'detailroommate/:id', component: RoommateSearchDetailComponent },
  { path: 'uiadmin', component: UIAdminComponent, canActivate:[AuthGuardService]
    , data: { roles: ['admin','user'] }, children:[
    { path: 'user-list', component: UserListComponent },
    { path: 'post-manage', component: PostManagementComponent},
    { path: 'approve-application', component: ApproveLandlordApplicationComponent},
    { path: 'homepage', component: HomepagemainComponent}
  ]},
  { path: 'post-for-roommate', component: FindRoommateComponent },
  { path: 'news-list', component: NewListContentComponent },
  { path: 'edit-profile', component: EditProfileContentComponent },
  { path: 'change-password', component: ChangePasswordContentComponent },
  { path: 'register-owner', component: RegisterOwnerContentComponent },
  // { path: 'uiuser', component: UIUserComponent,canActivate: [AuthguardserviceService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
