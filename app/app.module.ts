import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import { NgSemanticModule } from "ng-semantic"
import { DragulaModule } from "ng2-dragula/ng2-dragula"

import { AppComponent }  from './components/app.component'
import { routing, APP_ROUTER_PROVIDERS } from "./routes"

import { Auth } from "./services/auth"

import { ExamsComponent } from './components/exams/exams.component'
import { ExamsIndexComponent } from './components/exams/index.component'
import { ExamsNewComponent } from './components/exams/new.component'
import { ExamsTakeComponent } from './components/exams/take.component'

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
        APP_ROUTER_PROVIDERS,
        Auth
    ],
    declarations: [
        AppComponent,
        ExamsComponent,
        ExamsIndexComponent,
        ExamsNewComponent,
        ExamsTakeComponent,
        StopwatchComponent,
        ConfirmModalComponent,
        SplitSentencePipe,
        FormatMMSSSSPipe,
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}
