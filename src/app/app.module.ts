import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { BlockComponent } from './block/block.component';
import { EqualityCheckService } from './services/equalityCheckService';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    BlockComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [EqualityCheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
