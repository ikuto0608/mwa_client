import { NgModule }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { NgSemanticModule } from "ng-semantic"
import { DragulaModule } from "ng2-dragula/ng2-dragula"

import { AppComponent }  from './components/app.component'
import { routing, APP_ROUTER_PROVIDERS } from "./routes"

import { Auth } from "./services/auth"

import { ExamsComponent } from './components/exams/exams.component'
import { ExamsIndexComponent } from './components/exams/index.component'
import { ExamsNewComponent } from './components/exams/new.component'

import { SplitSentencePipe } from './pipes/split_sentence.pipe'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
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
        SplitSentencePipe,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
