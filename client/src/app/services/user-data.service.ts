import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private url = 'http://localhost/brain-lift/server/api/user/';


  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.url);
  }


  postData(formData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      params: new HttpParams(),
    };

    // Convert the formData object to URL-encoded format
    let body = new HttpParams();
    for (const key of Object.keys(formData)) {
      body = body.set(key, formData[key]);
    }

    return this.http.post(this.url, body.toString(), httpOptions);

  }

  updateData(formData: any): Observable<any> {

    const updateUrl = `${this.url}/update/`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      params: new HttpParams(),
    };

    // Convert the formData object to URL-encoded format
    let body = new HttpParams();
    for (const key of Object.keys(formData)) {
      body = body.set(key, formData[key]);
    }

    return this.http.post(updateUrl, body.toString(), httpOptions);

  }

  deleteData(formData: any): Observable<any> {
    const deleteUrl = `${this.url}/delete/`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      params: new HttpParams(),
    };

    // Convert the formData object to URL-encoded format
    let body = new HttpParams();
    for (const key of Object.keys(formData)) {
      body = body.set(key, formData[key]);
    }

    console.log(formData)
    return this.http.post(deleteUrl, body.toString(), httpOptions);

  }




  // Start a session
  startSession() {
    return this.http.get('http://localhost/brain-lift/server/api/user/start_session.php');
  }

  // Store session data
  storeSessionData(data: any) {
    return this.http.post('http://localhost/brain-lift/server/api/user/store_session_data.php', data);
  }

  // Retrieve session data
  getSessionData() {
    return this.http.get('http://localhost/brain-lift/server/api/user/get_session_data.php');
  }
}
