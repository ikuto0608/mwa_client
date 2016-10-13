import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { Topic } from './topic'

@Injectable()
export class Exam {
  public id: number
  public name: string
  public userId: number
  public categoryId: number
  public numberOfAnswer: number
  public topics: Array<Topic>

  static examsUrl = 'http://localhost:3000/exams'

  constructor(private http: Http) {
    this.topics = new Array<Topic>()
  }

  static all(): Observable<Exam[]> {
    let http: Http
    return http.get(this.examsUrl)
               .map((r: Response) => r.json().data as Exam[])
  }

  save() {
    let t = new Array<any>()
    let index = 0
    this.topics.forEach((topic) => {
      let elements = {}
      elements[index] = { question: topic.question, questionArray: topic.questionArray, indexArrayOfAnswer: topic.indexArrayOfAnswer }

      t.push(elements)
      index += 1
    })

    t = []

    this.topics.forEach((topic) => {
      t.push({ question: topic.question, questionArray: topic.questionArray, indexArrayOfAnswer: topic.indexArrayOfAnswer })
    })

    let e = {exam: {name: this.name, topics_attributes: t }}
    let body = JSON.stringify(e)
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

console.log(body)

     this.http.post('http://localhost:3000/exams', body, options)
              .map(res => res.json()).subscribe()
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
