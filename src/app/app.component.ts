import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state';
import { Beer } from './interface/beer';
import { CustomResponse } from './interface/custom-response';
import { BeerService } from './service/beer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/*  
* Application Component   
*/
export class AppComponent implements OnInit {

  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;

  displayedColumns: string[] = ['name', 'description', 'alcVol'];
  dataSource!: MatTableDataSource<Beer>;
  paginator!: MatPaginator;

  // Initialize paginator
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator !== undefined && this.dataSource) {
      this.paginator = paginator;
      this.dataSource.paginator = this.paginator;
    }
  }

  /**
  * Constructor
  * @param beerService
  */
  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.list(this.beerService.beers$);
  }

  /**
  * Lists beers
  * @param response
  */
  list(response: Observable<CustomResponse>) {
    this.appState$ = response
    .pipe(
      map(response => {
        this.dataSource = new MatTableDataSource(response.data.beers!);
        // Customize filter to search only in name and description fields
        this.dataSource.filterPredicate = (data: {name: string, description: string}, filterValue: string) =>
          data.name.trim().toLowerCase().indexOf(filterValue) !== -1 ||
          data.description.trim().toLowerCase().indexOf(filterValue) !== -1;
        return { dataState: DataState.LOADED, appData: response }
      }),
      startWith({ dataState: DataState.LOADING }),
      catchError((error: string) => {
        console.log(error);
        return of({ dataState: DataState.ERROR, error })
      })
    )
  }

  /**
  * Filters between Favourite and All beers
  * @param filter
  */
  filterBeers(filter: string) {
    switch (filter) {
      case "ALL": {
        this.list(this.beerService.beers$);
        break;
      } case "FAVOURITE": {
        this.list(this.beerService.favouriteBeers$);
        break;
      } default: {
        this.list(this.beerService.beers$);
      }
    }

  }

  /**
  * Filters based on beer name and description
  * @param event
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
