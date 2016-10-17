import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Exam } from '../../models/exam'
import { ExamService } from '../../services/exam.service'

@Component({
  selector: 'exams-index',
  templateUrl: 'app/components/exams/index.component.html',
  providers: [ExamService],
})
export class ExamsIndexComponent {
  public examArray: any

  constructor(private examService: ExamService, private router: Router) {

  }

  ngOnInit() {
    this.examArray = new Array<Exam>()

    this.examService.all()
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
