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

import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { FightersComponent } from './fighters/fighters.component';

const routes: Routes = [
  {path: 'fighters', component: FightersComponent},
  {path: 'competitions', component: CompetitionsComponent},
  {path: '', redirectTo: '/fighters', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    FightersComponent
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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
