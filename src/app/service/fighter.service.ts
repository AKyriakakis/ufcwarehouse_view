import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { Fighter } from '../interface/fighter';
import { CustomResponse } from '../interface/custom-response';

/*  
* Fighter Service class
*/
@Injectable({providedIn: 'root'})
export class FighterService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'https://ufcwarehouse.herokuapp.com/api/v1'

  /**
  * HTTP Request retireve all fighters from the database
  */
  fighters$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/fighters`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * HTTP Request to create/update a Fighter in the database
  */
  save$ = (fighter: Fighter) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/fighter/save`, fighter)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * HTTP Request to retrieve a Fighter from the database
  */
  get$ = (id: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/fighter/save/{id}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * HTTP Request to delete a Fighter from the database
  */
  delete$ = (id: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/fighter/delete/${id}`)
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
