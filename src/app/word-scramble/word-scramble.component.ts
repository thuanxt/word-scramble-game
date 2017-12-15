import { Component, OnInit , HostListener} from '@angular/core';
import { WordScramble} from '../word-scramble';
import { KeyCode } from '../key-code.enum';

@Component({
  selector: 'app-word-scramble',
  templateUrl: './word-scramble.component.html',
  styleUrls: ['./word-scramble.component.css']
})

export class WordScrambleComponent implements OnInit {

  wordScrambe: WordScramble;
  splittedChars: string[];
  inputWord: string = "";
  predictedWords: string[] = [];
  isHomePressed: boolean = false;

  constructor() { }
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (this.splittedChars.includes(event.key)) {
      // if enter character which is included in the suggested characters
      // concatenate character to the input word
      this.inputWord = this.inputWord.concat(event.key);
    } else if (event.keyCode === KeyCode.BackSpace) {
      // if BackSpace is pressed, remove the last character from the input word
      if (this.inputWord.length > 0) {
        this.inputWord = this.inputWord.substr(0, this.inputWord.length - 1);
      }
    } else if (event.keyCode === KeyCode.Home) {
      // if Home is pressed, display all the words
      this.isHomePressed = true;

    } else if (event.keyCode === KeyCode.Enter) {
      // if Enter is pressed, check if the input word is valid
      if (!this.predictedWords.includes(this.inputWord)
          && this.wordScrambe.expectedWords.includes(this.inputWord)) {
        // if input word is valid, add to the predicted word list and clear the input word
        this.predictedWords.push(this.inputWord);
        this.inputWord = "";
      }
      if (this.predictedWords.length === this.wordScrambe.expectedWords.length) {
        // if all the words have been predicted successfully, get the new word from the server
      }
    }
  }  

  ngOnInit() {
    this.wordScrambe = new WordScramble();
    this.wordScrambe.id = 1;
    this.wordScrambe.word = "window";
    this.wordScrambe.expectedWords = [
      "window",
      "win",
      "down"
    ];
    this.splittedChars = this.splitWord(this.wordScrambe.word);
  }

  private splitWord(word:string) {
    let result = new Array<string>(word.length);
    let randInt = Math.floor(Math.random() * (word.length - 1)) + 1;
    console.log(randInt);
    for (let i = 0; i < word.length; i++) {
      result[(i + randInt) % word.length] = word[i];
    }
    return result;
  }

}
