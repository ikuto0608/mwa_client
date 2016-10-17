import { Component, OnInit, Directive } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Exam } from '../../models/exam'
import { Question } from '../../models/question'
import { ExamService } from '../../services/exam.service'

//import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES, SemanticModalComponent } from "ng-semantic";

@Component({
  selector: 'exam-take',
  templateUrl: 'app/components/exams/take.component.html',
  styleUrls: ['app/components/exams/take.component.css'],
  providers: [ExamService]
})
export class ExamsTakeComponent {
  public exam: Exam
  public resultExam: Exam
  public questionIndex: number

  constructor(private examService: ExamService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id']
    this.examService.find(id)
        .subscribe(
          data => this.exam = Exam.toExam(data),
          err => console.log(err),
          () => console.log('done')
        )

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
  }

  sendResult() {
    this.examService.sendResult(this.exam.toJson())
        .subscribe(
          data => this.resultExam = data,
          err => console.log(err),
          () => this.showResult()
        )
  }
}
