import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import DollHouseBoard, { ROWS, COLS, SIZE, CARDS } from "./DollHouseBoard";


const DollHouse = Game({
  setup: () => ({
    cells: Array(ROWS * COLS).fill((0)),
    pivot: null,
    sw: 3,
    sh: 3,
    cn: 1,
    cardSelected: 0,
    card1: 1,
    card2: 2,
    card3: 3,
    deck: createDeck(CARDS),
    discard: [],
    reserve: [Object.assign({ c: 1, r: 2 }, CARDS[0])],
    scolor: "lightpink"
  }),

  moves: {
    clickCell(G, ctx, R, C) {
      const card = Object.assign({ r: R - CARDS[G.cn].h + 1, c: C }, CARDS[G.cn]);
      console.log("clickcell", CARDS[G.cn], card);
      console.log(R, C);
      G.reserve.push(card);
    },
    clickCard(G, ctx, cn, s = 0) {
      G.cn = cn;
    },
    selectCard(G, ctx, s = 0) {
      G.cardSelected = s;
      switch (s) {
        case 0:
          G.cn = G.card1;
          break;
        case 1:
          G.cn = G.card2;
          break;
        case 2:
          G.cn = G.card3;
          break;
        default:
          G.cardSelected = 0;
          G.cn = G.card1;
          break;
      }
      console.log('select', G.cn);
    },
    endRound(G, ctx) {
      G.discard.push(G.card2);
      G.discard.push(G.card3);
      if (G.deck.length > 0) {
        G.card2 = G.deck.splice(0, 1)[0];
      } else {
        shuffleArray(G.discard);
        G.deck = G.discard;
        G.discard = [];
        G.card2 = G.deck.splice(0, 1)[0];
      }
      if (G.deck.length > 0) {
        G.card3 = G.deck.splice(0, 1)[0];
      } else {
        shuffleArray(G.discard);
        G.deck = G.discard;
        G.discard = [];
        G.card3 = G.deck.splice(0, 1)[0];
      }
      G.cardSelected = 0;
      ctx.events.endTurn();
    }
  },
});

const App = Client({ game: DollHouse, board: DollHouseBoard, debug: false, numPlayers: 1 });

export default App;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function createDeck(cardtypes) {
  let deck = [];
  for (let i = 1; i < cardtypes.length; i++) {
    for (let j = 0; j < cardtypes[i].q; j++) {
      deck.push(cardtypes[i].id);
    }
  }
  shuffleArray(deck);
  console.log(deck);
  
  return deck;

}