import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "app/components/home.component.html",
  styleUrls: ["app/components/home.component.css"],
})
export class HomeComponent {
  constructor(private router: Router) {}


}
