import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { CustomResponse } from '../interface/custom-response';

/*  
* Rankings Service class
*/
@Injectable({providedIn: 'root'})
export class RankingsService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:3000/api/v1'

  /**
  * HTTP Request retireve all rankings from the backend
  */
  rankings$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/rankings`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * Error Handling
  * @param error
  */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    throw new Error(`${error.error.error}`);
  }

}
