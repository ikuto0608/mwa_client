import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'

import { Exam } from '../../models/exam'
import { Tag } from '../../models/tag'
import { Topic } from '../../models/topic'
import { ExamService } from '../../services/exam.service'

@Component({
  selector: 'topic-new',
  templateUrl: 'app/components/exams/new.component.html',
  styleUrls: ['app/components/exams/new.component.css'],
  providers: [ExamService]
})
export class ExamsNewComponent implements AfterViewInit {
  @ViewChild('confirmModal') confirmModal: ElementRef

  public tag: string
  public exam: Exam
  public modal: any

  constructor(private examService: ExamService) {
  }

  ngOnInit() {
    this.exam = new Exam()
    this.exam.topics.push(new Topic())
  }

  ngAfterViewInit() {
    this.modal = this.confirmModal
  }

  addTopic() {
    this.exam.topics.push(new Topic())
  }

  deleteTopic(index: number) {
    this.exam.topics.splice(index, 1)
  }

  createTopics() {
    if (this.exam.topics.length < 10) {
      let contentHash = { title: "Failed", message: "Topics have to be more than 10!" }
      this.modal.title = contentHash.title
      this.modal.message = contentHash.message

      return this.modal.confirmModal.show({
        inverted: true,
        duration: 100,
        onApprove: function() {
          return true
        },
        onDeny: function() {
          return true
        },
      })
    }

    let examService = this.examService
    let exam = this.exam
    this.modal.confirmModal.show({
      inverted: true,
      duration: 100,
      onApprove: function() {
        examService.save(exam.toJson())
      },
      onDeny: function() {
        return true
      },
    })
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
