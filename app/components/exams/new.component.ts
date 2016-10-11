import { Component, OnInit } from '@angular/core'
import { Topic } from '../../models/topic'
import { Category } from '../../models/category'

@Component({
  selector: 'topic-new',
  templateUrl: 'app/components/exams/new.component.html',
  styleUrls: ['app/components/exams/new.component.css'],
})
export class ExamsNewComponent {
  public topicArray: any
  public category: Category
  public numberOfAnswer: number

  constructor() {

  }

  ngOnInit() {
    this.topicArray = new Array<Topic>()
    this.topicArray.push(new Topic())
  }

  addTopic() {
    this.topicArray.push(new Topic())
  }

  deleteTopic(index: number) {
    this.topicArray.splice(index, 1)
  }

  createTopics() {

  }

  splitSentence(value: string, index: number) {
    this.topicArray[index].questionArray = []
    value.split(' ').forEach((word) => {
      this.topicArray[index].questionArray.push(word)
    })
  }

  setAnswer(indexOfTopicArray: number, indexOfWord: number) {
    var index = this.topicArray[indexOfTopicArray].indexArrayOfAnswer.indexOf(indexOfWord)
    if (index < 0) {
      this.topicArray[indexOfTopicArray].indexArrayOfAnswer.push(indexOfWord)
    } else {
      this.topicArray[indexOfTopicArray].indexArrayOfAnswer.splice(index, 1)
    }
  }

  isAnswerSelected(indexOfTopicArray: number, indexOfWord: number) {
    return this.topicArray[indexOfTopicArray].indexArrayOfAnswer.indexOf(indexOfWord) != -1
  }
}
