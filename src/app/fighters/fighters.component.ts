import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from '../enum/data-state.enum';
import { AppState } from '../interface/app-state';
import { Fighter } from '../interface/fighter';
import { CustomResponse } from '../interface/custom-response';
import { FighterService } from '../service/fighter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.css']
})

/*
* Fighters Component   
*/
export class FightersComponent implements OnInit {

  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;

  displayedColumns: string[] = ['name', 'nickname', 'age', 'weightclass', 'rank'];
  dataSource!: MatTableDataSource<Fighter>;
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
  * @param fighterService
  */
  constructor(private router: Router, @Inject(FighterService) private fighterService: FighterService) { }

  ngOnInit(): void {
    // Hide footer
    document.getElementById('app-footer')!.style.display = 'none';
    this.list(this.fighterService.fighters$);
  }

  /**
  * Lists fighters
  * @param response
  */
  list(response: Observable<CustomResponse>) {
    this.appState$ = response
    .pipe(
      map(response => {
        this.dataSource = new MatTableDataSource(response.data.fighters!);
        // Show footer
        document.getElementById('app-footer')!.style.display = 'block';
        // Customize filter to search only in name, nickname, age and weightclass fields
        this.dataSource.filterPredicate = (data: {name: string, nickname: string, age: number, weightclass: string}, filterValue: string) =>
          data.name.trim().toLowerCase().indexOf(filterValue) !== -1 ||
          data.nickname != null && data.nickname.trim().toLowerCase().indexOf(filterValue) !== -1 ||
          data.weightclass.trim().toLowerCase().indexOf(filterValue) !== -1 ||
          data.age.toString().indexOf(filterValue) !== -1;
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
  * Navigate between different pages
  * @param navigate
  */
  onNavigate(filter: string) {
    switch (filter) {
      case "FIGHTERS": {
        this.router.navigate(['fighters']);
        break;
      } case "COMPETITIONS": {
        this.router.navigate(['competitions']);
        break;
      } case "RANKINGS": {
        this.router.navigate(['rankings']);
        break;
      } default: {
        this.router.navigate(['fighters']);
      }
    }

  }

  /**
  * Filters based on fighter name and nickname
  * @param event
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
