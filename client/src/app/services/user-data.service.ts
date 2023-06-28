import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private url = 'https://www.brain-lift.org/brain-lift/server/api/user/';


    constructor(private http: HttpClient, private router: Router) {
    }

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

        // // check for sessionID or send to login page
        // const loggedIn = sessionStorage.getItem('sessionID');
        // if (!loggedIn) {
        //   this.router.navigateByUrl('/login');
        // }

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

    login(formData: any) {
        const loginURL = `${this.url}auth/`;

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

        return this.http.post(loginURL, body.toString(), httpOptions);

    }

    logout() {
        const logoutURL = `${this.url}auth/logout.php`;

        const sessionID = sessionStorage.getItem("sessionID")
        const userID = sessionStorage.getItem("userID")

        const formData: any = {}

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

        return this.http.post(logoutURL, body.toString(), httpOptions);
    }


    // Start a session
    startSession() {
        const startSessionURL = `${this.url}/start_session.php`;

        return this.http.get(startSessionURL);

    }

    // Store session data
    storeSessionData() {
        console.log()


    }


    // Retrieve session data
    getSessionData() {
        const getSessionDataURL = `${this.url}/get_session_data.php`;
        return this.http.get(getSessionDataURL);
    }
}