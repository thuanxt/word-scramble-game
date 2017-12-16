import { Component, OnInit, HostListener } from '@angular/core';
import { WordScramble } from '../word-scramble';
import { KeyCode } from '../key-code.enum';
import { WordScrambleService } from '../word-scramble.service';
import { MessageType } from '../message-type.enum';

@Component({
  selector: 'app-word-scramble',
  templateUrl: './word-scramble.component.html',
  styleUrls: ['./word-scramble.component.css']
})

export class WordScrambleComponent implements OnInit {

  wordScramble: WordScramble;
  splittedChars: string[];
  inputWord: string;
  predictedWords: string[];
  leftWords: string[];
  isHomePressed: boolean;
  isComplete: boolean;
  wordId: number = 1;
  message: string;
  messageType: MessageType;
  isEndOfGame: boolean;

  constructor(private wordScrambleService: WordScrambleService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.isEndOfGame) {
      if (this.isComplete || this.isHomePressed) {
        // if all the words have been predicted successfully or Home is pressed, get the new word from the server
        this.ngOnInit();
      } else if (this.splittedChars.includes(event.key)) {
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
        // get all the words that have not been predicted
        this.leftWords = this.wordScramble.expectedWords.filter(word => !this.predictedWords.includes(word));
        this.setMessage("Please refer the red words for the missing ones, press any key to get the new challenge.", MessageType.INFO);
      } else if (event.keyCode === KeyCode.Enter) {
        // if Enter is pressed, check if the input word is valid
        if (!this.inputWord) {
          this.setMessage("Please enter the character to form a word!", MessageType.WARNING);
        } else if (this.predictedWords.includes(this.inputWord)) {
          this.setMessage("You have already predicted this word, please try another one.", MessageType.WARNING);
        } else if (this.wordScramble.expectedWords.includes(this.inputWord)) {
          // if input word is valid, add to the predicted word list and clear the input word
          this.predictedWords.push(this.inputWord);
          this.inputWord = "";
          this.clearMessage();
          if (this.predictedWords.length === this.wordScramble.expectedWords.length) {
            this.isComplete = true;
            this.setMessage("Congatulations! You have predicted all the words, please press any key to get the new challenge.", MessageType.SUCCESS);
          }
        } else {
          this.setMessage("This word is not valid. Please try the other one or press Home to display all the words.", MessageType.ERROR);
        }
      } else {
        this.setMessage("Please only enter the character in the given list.", MessageType.WARNING);
      }
    }
  }

  ngOnInit() {
    this.isHomePressed = false;
    this.isComplete = false;
    this.isEndOfGame = true;
    this.inputWord = "";
    this.predictedWords = [];
    this.leftWords = [];
    this.clearMessage();
    this.getWord(this.wordId++);
  }

  private splitWord(word: string) {
    let result = new Array<string>(word.length);
    let randInt = Math.floor(Math.random() * (word.length - 1)) + 1;
    for (let i = 0; i < word.length; i++) {
      result[(i + randInt) % word.length] = word[i];
    }
    return result;
  }

  getWord(id: number): void {
    this.wordScrambleService.getWordScramble(id)
      .subscribe(wordScramble => {
        this.wordScramble = wordScramble;
        if (this.wordScramble.word) {
          this.splittedChars = this.splitWord(this.wordScramble.word);
          this.isEndOfGame = false;
        } else {
          this.isEndOfGame = true;
          this.setMessage("End of game!", MessageType.INFO);
        }
      }
      );
  }

  private setMessage(message: string, type: MessageType) {
    this.message = message;
    this.messageType = type;
  }

  private clearMessage() {
    this.message = "";
    this.messageType = MessageType.INFO;
  }

}
