import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';


import { AppComponent } from './app.component';
import { WordScrambleComponent } from './word-scramble/word-scramble.component';


@NgModule({
  declarations: [
    AppComponent,
    WordScrambleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
