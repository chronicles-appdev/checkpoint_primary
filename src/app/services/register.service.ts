
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Student, School, TestsApi } from '../model/register.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://ulearnlms.net/checkpoint/checkpoint.php';

  private apiUrl1 = 'https://chroniclesoft.com/igcse/igcse.php';

   constructor(private http: HttpClient) { }

    // Function to create a new test taken
    activate(code: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     };
     return this.http.post<any>(this.apiUrl1, code, httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
    // Function to create a new test taken
    createTest(test: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     };
     return this.http.post<any>(this.apiUrl, test, httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
    // Function to create a new student record
    createStudent(student: Student): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     };
     return this.http.post<any>(this.apiUrl, student, httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
    // Function to create a new student record
    checkSubjects(student: Student): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     };
     return this.http.post<any>(this.apiUrl, student, httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
    // Function to create a new student record
    createSubject(student: Student): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     };
     return this.http.post<any>(this.apiUrl, student, httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
  // Function to create a new student record
   getSearchTests(book: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, book, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


   // Function to create a Question 
   getQuestion(question: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, question, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


   // Function to create a Question 
   getQuestions(question: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, question, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


   // Function to create a Question 
   getResult(question: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, question, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

   // Function to create a Question 
   updateOptions(options: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, options, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


   // Function to create a new student record
   getTests(book: TestsApi): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, book, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

   // Function to create a new student record
   getYears(yera: TestsApi): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, yera, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

   // Function to create a new student record
   getSubjects(subj: TestsApi): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, subj, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


 // Error handling function
   private handleError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
       console.error('An error occurred:', error.error.message);
     } else {
       console.error(`Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);
     }
     return throwError('Something went wrong; please try again later.');
   }

}
