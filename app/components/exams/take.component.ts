import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Exam } from '../../models/exam'
import { Question } from '../../models/question'
import { ExamService } from '../../services/exam.service'

@Component({
  selector: 'exam-take',
  templateUrl: 'app/components/exams/take.component.html',
  styleUrls: ['app/components/exams/take.component.css'],
  providers: [ExamService]
})
export class ExamsTakeComponent {
  @ViewChild('stopwatchComponent') stopwatchComponent: any
  @ViewChild('resultModal') resultModal: any

  public exam: Exam
  public resultExam: Exam
  public questionIndex: number
  public progress: number
  public resultTime: number

  constructor(private examService: ExamService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id']
    this.examService.take(id)
        .subscribe(
          data => this.exam = Exam.toExam(data),
          err => console.log(err),
          () => console.log('done')
        )

    this.questionIndex = 0
    this.progress = 0
  }

  ngAfterViewInit() {
  }

  chooseAnswer(answerIndex) {
    this.exam.resultArray = this.exam.resultArray || new Array<Object>()
    this.exam.resultArray.push(
      { topic_id: this.exam.questions[this.questionIndex].id,
        answer: this.exam.questions[this.questionIndex].answers[answerIndex]
      }
    )

    if (this.exam.resultArray.length >= 10) {
      this.sendResult()
    }

    this.questionIndex++
  }

  sendResult() {
    let r = this.router
    this.exam.resultTime = this.stopwatchComponent.stopTime()

    this.examService.sendResult(this.exam.toJson())
        .subscribe(
          data => this.resultExam = Exam.toExam(data),
          err => console.log(err),
          () => this.resultModal.show({
                  inverted: true,
                  duration: 400,
                  observeChanges: true,
                  onApprove: function() {
                    r.navigate(['/exams'])
                  },
                })
        )
  }

  progressUp() {
    this.progress += 10
  }
}
