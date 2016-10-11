import { Component, OnInit } from '@angular/core'
import { Exam } from '../../models/exam'

@Component({
  selector: 'exams-index',
  templateUrl: 'app/components/exams/index.component.html',
})
export class ExamsIndexComponent {
  public examArray: any

  constructor() {

  }

  ngOnInit() {
    this.examArray = new Array<Exam>()

    let e1 = new Exam()
    e1.name = "exam1"
    this.examArray.push(e1)
    let e2 = new Exam()
    e2.name = "exam2"
    this.examArray.push(e2)
    let e3 = new Exam()
    e3.name = "exam3"
    this.examArray.push(e3)
  }

}
