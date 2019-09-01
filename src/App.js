import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import DollHouseBoard, { ROWS, COLS, SIZE, CARDS } from "./DollHouseBoard";


const DollHouse = Game({
  setup: () => ({
    cells: Array(ROWS * COLS).fill((0)),
    pivot: null,
    sw: 3,
    sh: 3,
    cn: 2,
    cardSelected: 0,
    card1: 0,
    card2: 1,
    card3: 2,
    deck: Array.from(Array(10).keys()).map(i => i + 3),
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
            G.cardSelected = 1;
            G.cn = G.card1;
          break;
      }
      console.log('select', G.cn);
    }

  },
});

const App = Client({ game: DollHouse, board: DollHouseBoard, debug: false });

export default App;