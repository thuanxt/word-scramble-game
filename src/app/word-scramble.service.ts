import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WordScramble } from './word-scramble';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export class WordScrambleService {

  constructor(private http: HttpClient) { }

  private wordScramblesUrl = 'api/wordscramble';

  /** GET WordScramble by id */
  getWordScramble(id: number): Observable<WordScramble> {
    const url = `${this.wordScramblesUrl}/${id}`;
    return this.http.get<WordScramble>(url).pipe(
      catchError(error => of(new WordScramble()))
    );
  }

}
