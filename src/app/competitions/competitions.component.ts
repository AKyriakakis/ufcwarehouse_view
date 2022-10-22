import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { DataState } from '../enum/data-state.enum';
import { AppState } from '../interface/app-state';
import { Competition } from '../interface/competition';
import { CustomResponse } from '../interface/custom-response';
import { CompetitionsService } from '../service/competititons.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  /**
  * Constructor
  * @param competitionsService
  * @param router
  */
  constructor(private router: Router, @Inject(CompetitionsService) private competitionsService: CompetitionsService) { }

  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;

  displayedColumns: string[] = ['name', 'organization'];
  dataSource!: MatTableDataSource<Competition>;
  paginator!: MatPaginator;

  // Initialize paginator
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator !== undefined && this.dataSource) {
      this.paginator = paginator;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    document.getElementById('app-footer')!.style.display = 'none';
    this.list(this.competitionsService.competitions$);
  }

  /**
  * Lists competitions
  * @param response
  */
  list(response: Observable<CustomResponse>) {
    this.appState$ = response
    .pipe(
      map(response => {
        this.dataSource = new MatTableDataSource(response.data.competitions!);
        document.getElementById('app-footer')!.style.display = 'block';

        // Customize filter to search only in name field
        this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
          data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
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
        this.router.navigate(['competitions']);
      }
    }

  }

  /**
  * Filters based on competition name
  * @param event
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
