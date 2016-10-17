import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { Topic } from './topic'
import { Question } from './question'

@Injectable()
export class Exam {
  public id: number
  public name: string
  public userId: number
  public categoryId: number
  public numberOfAnswer: number
  public topics: Array<Topic>
  public questions: Array<Question>
  public resultArray: Array<Object>

  static examsUrl = 'http://localhost:3000/exams'

  constructor(public http: Http) {
    this.topics = new Array<Topic>()
    this.questions = new Array<Question>()
    this.resultArray = new Array<Object>()
  }

  static all(): Observable<Exam[]> {
    let http: Http
    return http.get(this.examsUrl)
               .map((r: Response) => r.json().data as Exam[])
  }

  find(id: number) {
    this.http.get('http://localhost:3000/exams/take/' + id)
        .map((res: Response) => res.json())
        .subscribe(
          data => Exam.toExam(data),
          err => console.log(err),
          () => console.log('done')
        )
  }

  save() {
    let body = this.toJson()
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

     this.http.post('http://localhost:3000/exams', body, options)
              .map(res => res.json()).subscribe()
  }

  sendResult() {
    let body = this.toJson()
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

     this.http.post('http://localhost:3000/exams/result', body, options)
              .map(res => res.json()).subscribe()
  }

  toJson(): any {
    let topics = new Array<any>()

    if (this.topics) {
      this.topics.forEach((topic) => {
        topics.push({ question: topic.question, question_array: topic.questionArray, index_array_of_answer: topic.indexArrayOfAnswer })
      })
    }

    return JSON.stringify({exam: { id: this.id, name: this.name, topics_attributes: topics, result_array: this.resultArray }})
  }

  static toExam(json: any): Exam {
    let exam = Object.create(Exam.prototype)
    return Object.assign(exam, json)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
