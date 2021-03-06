import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

import { Exam } from "../../models/exam";
import { Tag } from "../../models/tag";
import { Topic } from "../../models/topic";
import { ExamService } from "../../services/exam.service";

@Component({
  selector: "topic-edit",
  templateUrl: "app/components/exams/edit.component.html",
  providers: [ExamService],
})
export class ExamsEditComponent {
  @ViewChild("confirmModal") confirmModal: ElementRef;

  public exam: Exam;
  public tag: string;
  public modal: any;

  constructor(private router: Router, private examService: ExamService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params["id"];
    this.examService.show(id)
        .subscribe(
          data => this.exam = Exam.toExam(data),
          err => {
            let contentHash = { title: "Failed", message: "You can't edit the exam which someone else created!" };
            this.modal.title = contentHash.title;
            this.modal.message = contentHash.message;

            return this.modal.confirmModal.show({
              inverted: true,
              duration: 100,
              onApprove: () => {
                this.router.navigate(["/exams"]);
              },
              onDeny: () => {
                this.router.navigate(["/exams"]);
              },
            });
          },
          () => console.log("done")
        );
  }

  ngAfterViewInit() {
    this.modal = this.confirmModal;
  }

  addTopic() {
    this.exam.topics.push(new Topic());
  }

  deleteTopic(index: number) {
    this.exam.topics.splice(index, 1);
  }

  splitSentence(value: string, index: number) {
    this.exam.topics[index].questionArray = [];
    value.split(" ").forEach((word) => {
      this.exam.topics[index].questionArray.push(word);
    });
  }

  setAnswer(indexOfTopicArray: number, indexOfWord: number) {
    let index = this.exam.topics[indexOfTopicArray].indexOfAnswerArray.indexOf(indexOfWord);
    if (index < 0) {
      this.exam.topics[indexOfTopicArray].indexOfAnswerArray.push(indexOfWord);
    } else {
      this.exam.topics[indexOfTopicArray].indexOfAnswerArray.splice(index, 1);
    }
  }

  isAnswerSelected(indexOfTopicArray: number, indexOfWord: number) {
    return this.exam.topics[indexOfTopicArray].indexOfAnswerArray.indexOf(indexOfWord) !== -1;
  }

  updateExam() {
    if (this.exam.topics.length < 10) {
      let contentHash = { title: "Failed", message: "Topics have to be more than 10!" };
      this.modal.title = contentHash.title;
      this.modal.message = contentHash.message;

      return this.modal.confirmModal.show({
        inverted: true,
        duration: 100,
        onApprove: function() {
          return true;
        },
        onDeny: function() {
          return true;
        },
      });
    }

    let isValid = !this.exam.topics.some((topic) => {
      if (topic.indexOfAnswerArray.length != this.exam.numberOfAnswer) {
        return true;
      }
    });

    if (!isValid) {
      let contentHash = { title: "Failed", message: "Each topic has correct number of answer!" };
      this.modal.title = contentHash.title;
      this.modal.message = contentHash.message;

      return this.modal.confirmModal.show({
        inverted: true,
        duration: 100,
        onApprove: function() {
          return true;
        },
        onDeny: function() {
          return true;
        },
      });
    }

    this.examService
        .update(this.exam.id, this.exam.toJson())
        .subscribe(
          res => {
            this.modal.title = "Notification";
            this.modal.message = "The exam created!";
            return this.modal.confirmModal.show({
              inverted: true,
              duration: 100,
              onApprove: () => {
                this.router.navigate(["/exams"]);
              },
              onDeny: () => {
                this.router.navigate(["/exams"]);
              },
            });
          },
          err => {
            this.modal.title = "Error";
            this.modal.message = "Something is wrong in server!";
            return this.modal.confirmModal.show({
              inverted: true,
              duration: 100,
              onApprove: () => {
                return true;
              },
              onDeny: () => {
                return true;
              },
            });
          },
          () => console.log("done"),
        );
  }

  splitTags(value: string) {
    if (this.tag.indexOf(" ") !== -1) {
      let tag = new Tag();
      tag.name = this.tag.split(" ")[0];
      this.exam.tags.push(tag);
      this.tag = "";
    }
  }

  pushTag() {
    if (typeof(this.tag) === "undefined" || this.tag === "") {
      return;
    }
    let tag = new Tag();
    tag.name = this.tag.split(" ")[0];
    this.exam.tags.push(tag);
    this.tag = "";
  }

  deleteTag(indexOfTag: number) {
    this.exam.tags.splice(indexOfTag, 1);
  }
}
