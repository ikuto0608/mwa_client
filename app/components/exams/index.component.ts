import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { Exam } from '../../models/exam'
import { ExamService } from '../../services/exam.service'

@Component({
  selector: 'exams-index',
  templateUrl: 'app/components/exams/index.component.html',
  providers: [ExamService],
})
export class ExamsIndexComponent implements AfterViewInit {
  @ViewChild('confirmModal') confirmModal: ElementRef

  public examArray: any
  public modal: any

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

  ngAfterViewInit() {
    this.modal = this.confirmModal
  }

  takeExam(id: number) {
    let r = this.router
    this.modal.confirmModal.show({
      inverted: true,
      duration: 100,
      onApprove: function() {
        r.navigate(['/exams/take/' + id])
      },
      onDeny: function() {
        return true
      },
    })
  }
}
