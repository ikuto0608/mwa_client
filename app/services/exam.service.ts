import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { Exam } from '../models/exam'
import { Config } from '../config'

@Injectable()
export class ExamService {
  private examsUrl = Config.apiUrl + 'exams/'

  constructor(public http: Http) {

  }

  all(): Observable<Exam[]> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)

    return this.http.get(this.examsUrl, { headers })
               .map((res) => res.json())
               .catch(this.handleError)
  }

  searchByTag(term: string): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
               .get(this.examsUrl + "search_by_tag?term=" + term, { headers })
               .map(res => {
                 this.isLoading = false;
                 return res.json();
               })
               .catch(err => {
                 this.isLoading = false;
                 return this.handleErrors(err);
               });
  }

  searchByTags(tags: any): Observable<Exam[]> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)

    let params: URLSearchParams = new URLSearchParams()
    params.set('tag', tags.toString())

    return this.http.get(this.examsUrl + 'search', { search: params, headers: headers })
               .map((res) => res.json())
               .catch(this.handleError)
  }

  show(id: number): Observable<Exam> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)

    return this.http.get(this.examsUrl + id, { headers })
               .map((res) => res.json())
               .catch(this.handleError)
  }

  take(id: number): Observable<Exam> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)

    return this.http.get(this.examsUrl + 'take/' + id, { headers })
               .map((res) => res.json())
               .catch(this.handleError)
  }

  save(examJson: any) {
    let body = examJson
    let headers = new Headers({'Content-Type': 'application/json'})
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)
    let options = new RequestOptions({headers: headers})

    this.http.post(this.examsUrl, body, options)
             .map(res => res.json()).subscribe()
  }

  update(id: number, examJson: any) {
    let body = examJson
    let headers = new Headers({'Content-Type': 'application/json'})
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)
    let options = new RequestOptions({headers: headers})

    this.http.post(this.examsUrl + id + '/update', body, options)
             .map(res => res.json()).subscribe()
  }

  sendResult(examJson: any) {
    let body = examJson

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)

    let options = new RequestOptions({headers: headers})

    return this.http.post(this.examsUrl + 'result', body, options)
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
