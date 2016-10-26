import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { Exam } from '../models/exam'

@Injectable()
export class ExamService {
  private examsUrl = 'http://localhost:3000/exams/'

  constructor(public http: Http) {

  }

  all(): Observable<Exam[]> {
    return this.http.get(this.examsUrl)
               .map((res) => res.json())
               .catch(this.handleError)
  }

  show(id: number): Observable<Exam> {
    return this.http.get(this.examsUrl + id)
               .map((res) => res.json())
               .catch(this.handleError)
  }

  find(id: number): Observable<Exam> {
    return this.http.get(this.examsUrl + 'take/' + id)
               .map((res) => res.json())
               .catch(this.handleError)
  }

  save(examJson: any) {
    let body = examJson
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

    this.http.post('http://localhost:3000/exams', body, options)
             .map(res => res.json()).subscribe()
  }

  update(id: number, examJson: any) {
    let body = examJson
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

    this.http.post('http://localhost:3000/exams/' + id + '/update', body, options)
             .map(res => res.json()).subscribe()
  }

  sendResult(examJson: any) {
    let body = examJson
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

    return this.http.post('http://localhost:3000/exams/result', body, options)
               .map(res => res.json())
               .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json()
    return body.data || { };
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
