import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { FormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import { NgSemanticModule } from "ng-semantic"
import { DragulaModule } from "ng2-dragula/ng2-dragula"

import { AppComponent }  from './components/app.component'
import { routing } from "./routes"

import { HomeComponent } from './components/home.component'

import { ExamsComponent } from './components/exams/exams.component'
import { ExamsIndexComponent } from './components/exams/index.component'
import { ExamsNewComponent } from './components/exams/new.component'
import { ExamsEditComponent } from './components/exams/edit.component'
import { ExamsTakeComponent } from './components/exams/take.component'

import { UsersComponent } from './components/users/users.component'
import { UsersLoginComponent } from './components/users/login.component'
import { UsersRegisterComponent } from './components/users/register.component'
import { UsersProfileComponent } from './components/users/profile.component'

import { LoggedInGuard } from './components/shares/logged-in.guard'

import { UserService } from './services/user.service'

import { StopwatchComponent } from './components/shares/stopwatch.component'
import { ConfirmModalComponent } from './components/shares/confirm_modal.component'

import { SplitSentencePipe } from './pipes/split_sentence.pipe'
import { FormatMMSSSSPipe } from './pipes/formatMMSSSS.pipe'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgSemanticModule,
        DragulaModule,
        routing
    ],
    providers: [
      UserService,
      LoggedInGuard,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ExamsComponent,
        ExamsIndexComponent,
        ExamsNewComponent,
        ExamsEditComponent,
        ExamsTakeComponent,
        StopwatchComponent,
        ConfirmModalComponent,
        SplitSentencePipe,
        FormatMMSSSSPipe,
        UsersComponent,
        UsersLoginComponent,
        UsersRegisterComponent,
        UsersProfileComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}
