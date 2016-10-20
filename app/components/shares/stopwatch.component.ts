import { Component } from '@angular/core'

@Component({
  selector: 'stopwatch',
  templateUrl: 'app/components/shares/stopwatch.component.html',
  styleUrls: ['app/components/shares/stopwatch.component.css'],
})
export class StopwatchComponent {
  private startTimestamp: Date
  private timeMilliseconds: number
  private timeMillisecondsFormatted: string

  constructor() {
    this.startTimestamp = new Date()

    setInterval(() => {
      this.timeMilliseconds = this.countTime(this.startTimestamp)
      this.format(this.timeMilliseconds)
    }, 10)
  }

  countTime(startTimestamp: any): number {
    let now: any = new Date()
    let diffMilliseconds = now - startTimestamp
    return diffMilliseconds
  }

  format(timeMilliseconds: any) {
    this.timeMillisecondsFormatted = timeMilliseconds.toString()
    while (this.timeMillisecondsFormatted.length < 6) {
      this.timeMillisecondsFormatted = "0" + this.timeMillisecondsFormatted
    }
  }
}
