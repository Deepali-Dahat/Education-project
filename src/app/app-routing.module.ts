import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddVideosComponent } from './add-videos/add-videos.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentsComponent } from './add-assignments/add-assignments.component';
import { AddTestsComponent } from './add-tests/add-tests.component';
import { AddEbooksComponent } from './add-ebooks/add-ebooks.component';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { ResultComponent } from './result/result.component';
import { EditTestComponent } from './edit-test/edit-test.component';

const routes: Routes = [
   {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LogInComponent},
  {path:'dashboard',component:DashboardComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'userProfile',component:UserProfileComponent},
    {path:'addvideos',component:AddVideosComponent},
    {path:'addNotes',component:AddNotesComponent},
    {path:'addAssignments',component:AddAssignmentsComponent},
    {path:'addTests',component:AddTestsComponent},
    {path:'addEBooks',component:AddEbooksComponent},
    {path:'noticeBoard',component:NoticeBoardComponent},
    {path:'assignments',component:AssignmentsComponent},
    {path:'editassignment',component:EditAssignmentComponent},
    {path:'result',component:ResultComponent},
    {path:'editTest',component:EditTestComponent}
    //{path:'viewNotes',component:ViewNotesComponent}
  ]
},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'registration',component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
