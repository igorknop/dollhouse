import React from 'react';
import "./DollHouseBoard.css";
import logo from "./dollhouse-and-write.png";

export const CARDS = [
    { id: 0, name: "permit", w: 12, h: 9 },

    { id: 1, name: "roof", w: 3, h: 1 },
    { id: 2, name: "small-room", w: 3, h: 3 },
    { id: 3, name: "medium-room", w: 5, h: 3 },
    { id: 4, name: "big-room", w: 7, h: 3 },
    { id: 5, name: "tall-room", w: 3, h: 6 },
    { id: 6, name: "doll", w: 1, h: 2 },

    { id: 7, name: "toilet", w: 1, h: 1 },
    { id: 8, name: "shower", w: 1, h: 3 },
    
    { id: 9, name: "bed", w: 3, h: 6 },
    { id: 10, name: "tv", w: 1, h: 1 },

    { id: 11, name: "coach", w: 3, h: 1 },
    { id: 12, name: "table", w: 3, h: 2 },
    { id: 13, name: "big-tv", w: 2, h: 1 },

    { id: 14, name: "stove", w: 2, h: 2 },
    { id: 15, name: "kitchen-table", w: 2, h: 2 },

    { id: 16, name: "bench", w: 2, h: 1 },
    { id: 17, name: "plant", w: 1, h: 2 },
    { id: 18, name: "painting", w: 1, h: 1 },




    
    
];


export const [ROWS, COLS, SIZE] = [11, 12, 40];
export default class DollHouseBoard extends React.Component {
    onClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log("click>",rect, e.pageX, e.clientX, e.offsetX);
        
        const C = Math.floor(x / SIZE);
        const R = Math.floor(y / SIZE);
        console.log("onclick", x, y, R, C);
        this.props.moves.clickCell(R, C);
    }

    onCardClick(cn) {
        this.props.moves.clickCard(cn);
    }

    onMouseMove(id) {
        if (this.isActive(id)) {
            this.props.moves.mouseOver(id);
        }
    }


    isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.cells[id] !== 0) return false;
        return true;
    }

    render() {
        console.log(this.props.G.reserve);
        
        let winner = '';
        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined ? (
                    <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
                ) : (
                        <div id="winner">Draw!</div>
                    );
        }
        let itens =
            this.props.G.reserve.map((r, k) => <div key={"room" + k} style={{
                width: (r.w * SIZE - 8) + "px",
                height: (r.h * SIZE - 8) + "px",
                left: (r.c * SIZE - 8) + "px",
                top: (r.r * SIZE - 8) + "px",
                backgroundColor: r.color,
            }} className={`room ${r.name}`}></div>);

        let cards = CARDS.map((c, k) => (
            <div className="card" key={"card" + c.id + k} onClick={() => { this.onCardClick(c.id) }}>
                <div>{c.id}</div> 
                <div>{c.name}</div>
                <div>{c.w}x{c.h}</div>
            </div>
        ));



        return (
            <div id="dollhouse-game">
                <img src={logo} alt="Dollhouse & Write" height="180"/>
                <div id="paper" style={{ width: (COLS+2) * SIZE, height: ROWS * SIZE }}>
                    <div id="board" style={{ width: (COLS+2) * SIZE, height: ROWS * SIZE }} onClick={(e) => { this.onClick(e) }}>
                        {itens}
                    </div>
                </div>
                <div id="cards">
                    {cards[this.props.G.cn]}
                    {cards}
                </div>
            </div>
        );
    }
}