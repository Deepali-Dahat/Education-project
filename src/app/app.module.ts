import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddVideosComponent } from './add-videos/add-videos.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentsComponent } from './add-assignments/add-assignments.component';
import { AddTestsComponent } from './add-tests/add-tests.component';
import { AddEbooksComponent } from './add-ebooks/add-ebooks.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { ResultComponent } from './result/result.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { AllPlaceholderDirective } from './all-placeholder.directive';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    HomeComponent,
    UserProfileComponent,
    ForgotPasswordComponent,
    RegistrationComponent,
    AddVideosComponent,
    AddNotesComponent,
    ViewNotesComponent,
    NoticeBoardComponent,
    AssignmentsComponent,
    AddAssignmentsComponent,
    AddTestsComponent,
    AddEbooksComponent,
    EditAssignmentComponent,
    ResultComponent,
    EditTestComponent,
    AllPlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,PdfViewerModule,
    NgxExtendedPdfViewerModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);