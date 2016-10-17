import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Exam } from '../../models/exam'
import { Question } from '../../models/question'

@Component({
  selector: 'exam-take',
  templateUrl: 'app/components/exams/take.component.html',
  styleUrls: ['app/components/exams/take.component.css'],
  providers: [Exam]
})
export class ExamsTakeComponent {
  public exam: Exam
  public questionIndex: number

  constructor(private _exam: Exam, private route: ActivatedRoute) {
    let id = +this.route.snapshot.params['id']
    this._exam.http.get('http://localhost:3000/exams/take/' + id)
        .map((res) => res.json())
        .subscribe(
          data => this.exam = Exam.toExam(data),
          err => console.log(err),
          () => console.log('done')
        )
  }

  ngOnInit() {
    this.questionIndex = 0
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
    console.log(this.exam.resultArray)
  }

  sendResult() {
    this._exam.id = this.exam.id
    this._exam.resultArray = this.exam.resultArray
    this._exam.sendResult()
  }
}
