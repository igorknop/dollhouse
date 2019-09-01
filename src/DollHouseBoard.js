import React from 'react';
import "./DollHouseBoard.css";

export const CARDS = [
    { id: 0, name: "roof", w: 3, h: 1, color: "lightgreen" },
    { id: 1, name: "small room", w: 3, h: 3, color: "lightpink" },
    { id: 2, name: "medium room", w: 5, h: 3, color: "pink" },
    { id: 3, name: "big room", w: 7, h: 3, color: "darkpink" },
];


export const [ROWS, COLS, SIZE] = [9, 12, 40];
export default class DollHouseBoard extends React.Component {
    onClick(e) {
        const x = e.clientX;
        const y = e.clientY;
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
            }} className="room"></div>);

        let cards = CARDS.map((c, k) => <div className="card" key={"card" + c.id + k} onClick={() => { this.onCardClick(c.id) }}>{c.id} {c.name}</div>)



        return (
            <div>
                <div id="board" style={{ width: COLS * SIZE, height: ROWS * SIZE }} onClick={(e) => { this.onClick(e) }}>
                    {itens}
                </div>
                &rarr; {cards[this.props.G.cn]}
                <div id="cards">
                    {cards}
                </div>
            </div>
        );
    }
}