import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from "./services/authguard"

import { ExamsComponent } from './components/exams/exams.component'
import { ExamsIndexComponent } from './components/exams/index.component'
import { ExamsNewComponent } from './components/exams/new.component'

export const routes: Routes = [
  { path: 'exams',
      component: ExamsComponent,
      children: [
        { path: '', component: ExamsIndexComponent },
        { path: 'new', component: ExamsNewComponent },
      ]
    },
];

export const APP_ROUTER_PROVIDERS: Array<{}> = [
    AuthGuard,
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
