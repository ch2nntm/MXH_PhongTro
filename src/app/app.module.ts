import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component';
import { HomepagemainComponent } from './components/homepagemain/homepagemain.component';
import { RentRoomComponent } from './components/rent-room/rent-room.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { RoommateSearchComponent } from './components/roommate-search/roommate-search.component';
import { RoommateSearchDetailComponent } from './components/roommate-search-detail/roommate-search-detail.component';
import { NewsComponent } from './components/news/news.component';
import { ListFavoritePostComponent } from './components/list-favorite-post/list-favorite-post.component';
import { PostManagementComponent } from './components/post-management/post-management.component';
import { RegisterComponent } from './components/register/register.component';
import { ApproveLandlordApplicationComponent } from './components/approve-landlord-application/approve-landlord-application.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UIUserComponent } from './components/uiuser/uiuser.component';
import { UIAdminComponent } from './components/uiadmin/uiadmin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangePasswordContentComponent } from './components/change-password-content/change-password-content.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { EditProfileContentComponent } from './components/edit-profile-content/edit-profile-content.component';
import { FindRoommateComponent } from './components/find-roommate/find-roommate.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewListContentComponent } from './components/new-list-content/new-list-content.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RegisterOwnerContentComponent } from './components/register-owner-content/register-owner-content.component';
import { AuthGuardService } from './services/authguard/authguardservice.guard';
import { MyInterceptor } from './services/my-interceptor/my-interceptor.service';
import { ItemroommateComponent } from './components/itemroommate/itemroommate/itemroommate.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HistoryComponent,
    HomepagemainComponent,
    RentRoomComponent,
    RoomDetailComponent,
    RoommateSearchComponent,
    RoommateSearchDetailComponent,
    NewsComponent,
    ListFavoritePostComponent,
    PostManagementComponent,
    RegisterComponent,
    ApproveLandlordApplicationComponent,
    UserListComponent,
    MenuComponent,
    NavbarUserComponent,
    UIUserComponent,
    UIAdminComponent,
    ChangePasswordContentComponent,
    EditPostComponent,
    EditProfileContentComponent,
    FindRoommateComponent,
    NavbarComponent,
    NewListContentComponent,
    NewsComponent,
    EditUserComponent,
    RegisterOwnerContentComponent,
    RoommateSearchDetailComponent,
    RoomDetailComponent,
    UserListComponent,
    ListFavoritePostComponent,
    ApproveLandlordApplicationComponent,
    HistoryComponent,
    PostManagementComponent,
    RentRoomComponent,
    RoommateSearchComponent,
    ItemroommateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatSliderModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatFormField,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    
  ],
  providers: [
    provideClientHydration(),
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    
    // authInterceptorProviders, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
