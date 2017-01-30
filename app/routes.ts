import { Routes, RouterModule } from "@angular/router";

import { ExamsComponent } from "./components/exams/exams.component";
import { ExamsIndexComponent } from "./components/exams/index.component";
import { ExamsNewComponent } from "./components/exams/new.component";
import { ExamsEditComponent } from "./components/exams/edit.component";
import { ExamsTakeComponent } from "./components/exams/take.component";

import { UsersComponent } from "./components/users/users.component";
import { UsersLoginComponent } from "./components/users/login.component";
import { UsersRegisterComponent } from "./components/users/register.component";
import { UsersProfileComponent } from "./components/users/profile.component";

import { HomeComponent } from "./components/home.component";

// import { ProfileComponent } from "./components/profile.component"

import { LoggedInGuard } from "./components/shares/logged-in.guard";

export const routes: Routes = [
  { path: "users", component: UsersComponent,
    children: [
      { path: "", component: UsersProfileComponent, canActivate: [LoggedInGuard] },
      { path: "login", component: UsersLoginComponent },
      { path: "register", component: UsersRegisterComponent },
    ]
  },
  // { path: "profile", component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "exams", component: ExamsComponent,
    children: [
      { path: "", component: ExamsIndexComponent },
      // { path: "new", component: ExamsNewComponent, canActivate: [LoggedInGuard] },
      { path: "new", component: ExamsNewComponent },
      { path: "edit/:id", component: ExamsEditComponent },
      { path: "take/:id", component: ExamsTakeComponent },
    ]
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
