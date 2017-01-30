import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "stopwatch",
  templateUrl: "app/components/shares/stopwatch.component.html",
  styleUrls: ["app/components/shares/stopwatch.component.css"],
})
export class StopwatchComponent {
  @ViewChild("stopwatchComponent") stopwatchComponent: StopwatchComponent;

  private startTimestamp: any;
  private timeMilliseconds: number;
  private interval: any;

  constructor() {
    this.startTimestamp = new Date();

    this.interval = setInterval(() => {
      this.timeMilliseconds = this.countTime();
    }, 10);
  }

  countTime(): number {
    let now: any = new Date();
    let diffMilliseconds = now - this.startTimestamp;
    return diffMilliseconds;
  }

  stopTime(): number {
    let now: any = new Date();
    let diffMilliseconds = now - this.startTimestamp;
    clearInterval(this.interval);
    return diffMilliseconds;
  }
}
