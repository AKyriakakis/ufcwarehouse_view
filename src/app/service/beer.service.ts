import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { Beer } from '../interface/beer';
import { CustomResponse } from '../interface/custom-response';

/*  
* Beer Service class
*/
@Injectable({providedIn: 'root'})
export class BeerService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:8080'

  /**
  * HTTP Request retireve all beers from the database
  */
  beers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/beer/list`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * HTTP Request retireve all favourite beers from the database
  */
  favouriteBeers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/beer/listFavourite`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * HTTP Request to create/update a Beer int the database
  */
  save$ = (beer: Beer) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/beer/save`, beer)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * HTTP Request to retrieve a Beer from the database
  */
  get$ = (id: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/beer/save/{id}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  /**
  * HTTP Request to delete a Beer for the database
  */
  delete$ = (id: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/beer/delete/${id}`)
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
