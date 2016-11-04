import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { Exam } from '../../models/exam'
import { ExamService } from '../../services/exam.service'

@Component({
  selector: 'exams-index',
  templateUrl: 'app/components/exams/index.component.html',
  styleUrls: ['app/components/exams/exams.component.css'],
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

  editExam(id: number) {
    this.router.navigate(['exams/edit/' + id])
  }

  takeExam(id: number) {
    console.log(this.examArray[0])
    
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
