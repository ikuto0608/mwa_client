import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Exam } from '../../models/exam'

@Component({
  selector: 'exams-index',
  templateUrl: 'app/components/exams/index.component.html',
  providers: [Exam],
})
export class ExamsIndexComponent {
  public examArray: any

  constructor(private _exam: Exam, private router: Router) {

  }

  ngOnInit() {
    this.examArray = new Array<Exam>()

    //let e1 = new Exam()
    //e1.name = "exam1"
    //this.examArray.push(e1)
    //let e2 = new Exam()
    //e2.name = "exam2"
    //this.examArray.push(e2)
    //let e3 = new Exam()
    //e3.name = "exam3"
    //this.examArray.push(e3)

    this._exam.http.get('http://localhost:3000/exams')
        .map((res) => res.json())
        .subscribe(
          data => this.examArray = data,
          err => console.log(err),
          () => console.log('done')
        )
  }

  takeExam(id: number) {
    this.router.navigate(['/exams/take/' + id])
  }

}
