import { Component, OnInit } from '@angular/core'

import { Category } from '../../models/category'
import { Exam } from '../../models/exam'
import { Topic } from '../../models/topic'

@Component({
  selector: 'topic-new',
  templateUrl: 'app/components/exams/new.component.html',
  styleUrls: ['app/components/exams/new.component.css'],
  providers: [Exam]
})
export class ExamsNewComponent {
  public category: Category
  //public exam: Exam

  constructor(private exam: Exam) {

  }

  ngOnInit() {
    //this.exam = new Exam()
    this.exam.topics.push(new Topic())
  }

  addTopic() {
    this.exam.topics.push(new Topic())
  }

  deleteTopic(index: number) {
    this.exam.topics.splice(index, 1)
  }

  createTopics() {
    this.exam.save()
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
}
