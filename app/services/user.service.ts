import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

@Injectable()
export class UserService {
  private loggedIn = false
  private loginUrl = 'http://localhost:3000/auth_user/'

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token')
  }

  login(email, password) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    return this.http
               .post(this.loginUrl,
                     JSON.stringify({ 'email': email, 'password': password }),
                     { headers }
               )
               .map((res) => res.json())
               .map((res) => {
                 if (res.success) {
                   localStorage.setItem('auth_token', res.auth_token)
                   this.loggedIn = true
                 }

                 return res.success
               })
  }

  logout() {
    localStorage.removeItem('auth_token')
    this.loggedIn = false
  }

  isLoggedIn() {
    return this.loggedIn
  }

  getRecords() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let authToken = localStorage.getItem('auth_token')
    headers.append('Authorization', `Bearer ${authToken}`)

    return this.http.get('/records', { headers })
               .map(res => res.json())
  }

}