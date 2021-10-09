import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs'; 
import {catchError, retry} from 'rxjs/operators';
import { Contact } from '../Models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient) { }

apiURL = "https://localhost:44316/api";
// Http Options
httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' :  'application/json'
    })
  }
  
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURL + '/Contacts')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getContact(id : number): Observable<Contact> {
    return this.http.get<Contact>(this.apiURL + '/Contacts/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  createEmployee(input : Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiURL + '/Contacts/CreateContact', input, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateEmployee(id : number, contact : Contact): Observable<Contact> {
    return this.http.put<Contact>(this.apiURL + '/Contacts/' + id, JSON.stringify(contact), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteContact(id : number): Observable<any> {
    return this.http.delete(this.apiURL + '/Contacts/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  // Error handling 
  handleError(error : any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
