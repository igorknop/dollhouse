import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import DollHouseBoard,{ROWS, COLS, SIZE} from "./DollHouseBoard";

const DollHouse = Game({
  setup: () => ({ 
    cells: Array(ROWS*COLS).fill((0)),
    pivot: null,
    sw: 3,
    sh: 3,
    reserve: [] 
  }),

  moves: {
    clickCell(G, ctx, R, C) {
      G.reserve.push({r:R, c:C, w: G.sw, h: G.sh, l:0});
      console.log(G.reserve);
    },
  },
});

const App = Client({ game: DollHouse, board: DollHouseBoard });

export default App;