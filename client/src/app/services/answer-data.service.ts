import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AnswerDataService {
  private url = 'https://www.brain-lift.org/brain-lift/server/api/answer/';


  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.url);
  }

  getAnswerData() {
    const url = 'https://www.brain-lift.org/brain-lift/server/api/answer/get/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      params: new HttpParams(),
    };


    const sessionID = sessionStorage.getItem("sessionID")
    const userID = sessionStorage.getItem("userID")

    const formData = {
      "userID": userID,
      "sessionID": sessionID
    }

    // Convert the formData object to URL-encoded format
    let body = new HttpParams();
    for (const key of Object.keys(formData)) {
      body = body.set(key, (formData as any)[key]);
    }

    return this.http.post(url, body.toString(), httpOptions);
  }


  postData(formData: any): Observable<any> {
    const sessionID = sessionStorage.getItem("sessionID")
    const userID = sessionStorage.getItem("userID")

    formData.sessionID = sessionID;
    formData.userID = userID;


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





}
