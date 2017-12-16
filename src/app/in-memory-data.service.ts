import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const wordScrambles = [
      { id: 1, 
        word: 'window',
        expectedWords: [
          "window",
          "win",
          "down"
        ] 
      },
      { id: 2, 
        word: 'door',
        expectedWords: [
          "door",
          "or",
          "do"
        ] 
      },
      { id: 3, 
        word: 'house',
        expectedWords: [
          "house",
          "use"
        ] 
      },
      { id: 4, 
        word: 'table',
        expectedWords: [
          "table",
          "able"
        ] 
      },
      { id: 4, 
        word: 'floor',
        expectedWords: [
          "floor",
          "or"          
        ] 
      },
      { id: 5, 
        word: 'ground',
        expectedWords: [
          "ground",
          "round",
          "do",
          "run"
        ] 
      }
    ];
    return {wordScrambles};
  }
}