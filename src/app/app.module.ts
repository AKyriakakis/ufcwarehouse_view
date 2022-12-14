import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { FightersComponent } from './fighters/fighters.component';
import { RankingsComponent } from './rankings/rankings.component';

const routes: Routes = [
  {path: 'fighters', component: FightersComponent},
  {path: 'competitions', component: CompetitionsComponent},
  {path: 'rankings', component: RankingsComponent},
  {path: '', redirectTo: '/fighters', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    FightersComponent,
    RankingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
