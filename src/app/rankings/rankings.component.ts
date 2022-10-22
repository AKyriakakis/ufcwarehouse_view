import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { DataState } from '../enum/data-state.enum';
import { AppState } from '../interface/app-state';
import { Ranking } from '../interface/ranking';
import { CustomResponse } from '../interface/custom-response';
import { RankingsService } from '../service/rankings.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  /**
  * Constructor
  * @param rankingsService
  * @param router
  */
  constructor(private router: Router, @Inject(RankingsService) private rankingsService: RankingsService) { }

  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;

  displayedColumns: string[] = ['rank', 'name',];

  dataSourceP4P!: MatTableDataSource<Ranking>; // Pound for pound
  dataSourceFLW!: MatTableDataSource<Ranking>; // Flyweight
  dataSourceBW!: MatTableDataSource<Ranking>; // Bantamweight
  dataSourceFW!: MatTableDataSource<Ranking>; // Featherweight
  dataSourceLW!: MatTableDataSource<Ranking>; // Lightweight
  dataSourceWW!: MatTableDataSource<Ranking>; // Welterweight
  dataSourceMW!: MatTableDataSource<Ranking>; // Middleweight
  dataSourceLHW!: MatTableDataSource<Ranking>; // Lightheavyweight
  dataSourceHW!: MatTableDataSource<Ranking>; // Heavyweight
  dataSourceWSW!: MatTableDataSource<Ranking>; // Women's Strawweight
  dataSourceWFW!: MatTableDataSource<Ranking>; // Women's Flyweight
  dataSourceWBW!: MatTableDataSource<Ranking>; // Women's Bantamweight

  resking!: Ranking[];

  ngOnInit(): void {
    // Hide footer until data load
    document.getElementById('app-footer')!.style.display = 'none';
    this.list(this.rankingsService.rankings$);
  }

  /**
  * Lists rankings
  * @param response
  */
  list(response: Observable<CustomResponse>) {
    this.appState$ = response
    .pipe(
      map(response => {
        this.initializeDataSources(response.data.rankings!);
        // Show footer
        document.getElementById('app-footer')!.style.display = 'block';

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
   * @param filter
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
        this.router.navigate(['rankings']);
      }
    }

  }

  /**
  * Filters based on rankings name
  * @param event
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceP4P.filter = filterValue.trim().toLowerCase();
  }

  initializeDataSources (rankings:  Ranking[]) {
    this.dataSourceP4P = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[0]))));
    this.dataSourceFLW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[1]))));
    this.dataSourceBW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[2]))));
    this.dataSourceFW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[3]))));
    this.dataSourceLW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[4]))));
    this.dataSourceWW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[5]))));
    this.dataSourceMW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[6]))));
    this.dataSourceLHW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[7]))));
    this.dataSourceHW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[8]))));
    this.dataSourceWSW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[9]))));
    this.dataSourceWFW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[10]))));
    this.dataSourceWBW = new MatTableDataSource(JSON.parse(parseDatasource(JSON.stringify(rankings[11]))));
  }

}



/**
 * Returns JSON formatted string suitable for each datasource
 * @param json
 */
function parseDatasource(json: string) {
  return json.substring(json.indexOf("\"competitor_rankings\":") + 22, json.length - 1);;
}
