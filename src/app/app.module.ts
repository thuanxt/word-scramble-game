// import module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// todo remove when backend is ready
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
// import { InMemoryDataService }  from './in-memory-data.service';

// import component
import { AppComponent } from './app.component';
import { WordScrambleComponent } from './word-scramble/word-scramble.component';

// import service
import { WordScrambleService } from './word-scramble.service';

@NgModule({
  declarations: [
    AppComponent,
    WordScrambleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [
    WordScrambleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
