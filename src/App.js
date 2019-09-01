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
    reserve: [Object.assign({c:1, r:2},CARDS[0])],
    scolor: "lightpink"
  }),

  moves: {
    clickCell(G, ctx, R, C) {
      const card = Object.assign({r: R-CARDS[G.cn].h+1, c:C}, CARDS[G.cn]);
      console.log("clickcell",CARDS[G.cn], card);
      console.log(R,C);
      G.reserve.push( card);
    },
    clickCard(G, ctx, cn) {
      G.cn = cn;
    }
  },
});

const App = Client({ game: DollHouse, board: DollHouseBoard, debug:false });

export default App;