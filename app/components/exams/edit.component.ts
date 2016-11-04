import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Exam } from '../../models/exam'
import { Tag } from '../../models/tag'
import { Topic } from '../../models/topic'
import { ExamService } from '../../services/exam.service'

@Component({
  selector: 'topic-edit',
  templateUrl: 'app/components/exams/edit.component.html',
  providers: [ExamService],
})
export class ExamsEditComponent {
  public exam: Exam
  public tag: string

  constructor(private examService: ExamService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id']
    this.examService.show(id)
        .subscribe(
          data => this.exam = Exam.toExam(data),
          err => console.log(err),
          () => console.log('done')
        )
  }

  addTopic() {
    this.exam.topics.push(new Topic())
  }

  deleteTopic(index: number) {
    this.exam.topics.splice(index, 1)
  }

  splitSentence(value: string, index: number) {
    this.exam.topics[index].questionArray = []
    value.split(' ').forEach((word) => {
      this.exam.topics[index].questionArray.push(word)
    })
  }

  setAnswer(indexOfTopicArray: number, indexOfWord: number) {
    var index = this.exam.topics[indexOfTopicArray].indexArrayOfAnswer.indexOf(indexOfWord)
    if (index < 0) {
      this.exam.topics[indexOfTopicArray].indexArrayOfAnswer.push(indexOfWord)
    } else {
      this.exam.topics[indexOfTopicArray].indexArrayOfAnswer.splice(index, 1)
    }
  }

  isAnswerSelected(indexOfTopicArray: number, indexOfWord: number) {
    return this.exam.topics[indexOfTopicArray].indexArrayOfAnswer.indexOf(indexOfWord) != -1
  }

  updateExam() {
    this.examService.update(this.exam.id, this.exam.toJson())
  }

  splitTags(value: string) {
    if (this.tag.indexOf(' ') !== -1) {
      let tag = new Tag()
      tag.name = this.tag.split(' ')[0]
      this.exam.tags.push(tag)
      this.tag = ""
    }
  }

  pushTag() {
    if (typeof(this.tag) == "undefined" || this.tag == "") {
      return
    }
    let tag = new Tag()
    tag.name = this.tag.split(' ')[0]
    this.exam.tags.push(tag)
    this.tag = ""
  }

  deleteTag(indexOfTag: number) {
    this.exam.tags.splice(indexOfTag, 1)
  }
}
