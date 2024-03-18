import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiURL = "http://127.0.0.1:8000/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<any> {
    return this.httpClient.get(this.apiURL + 'items')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(item:Item): Observable<any> {
  
    return this.httpClient.post(this.apiURL + 'items', JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + 'items/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:number, item:Item): Observable<any> {
  
    return this.httpClient.put(this.apiURL + 'items/' + id, JSON.stringify(item), this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + 'items/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
