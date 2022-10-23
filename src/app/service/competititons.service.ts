import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { CustomResponse } from '../interface/custom-response';

/*  
* Competition Service class
*/
@Injectable({providedIn: 'root'})
export class CompetitionsService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'https://ufcwarehouse.herokuapp.com/api/v1'

  /**
  * HTTP Request retireve all competitions from the backend
  */
  competitions$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/competitions`)
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
