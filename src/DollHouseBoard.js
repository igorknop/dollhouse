import React from 'react';
import Card from "./Card";
import "./DollHouseBoard.css";
import logo from "./dollhouse-and-write.png";

export const CARDS = [
    { id: 0, q:1, name: "permit", w: 12, h: 9 },

    { id: 1, q:1, name: "roof", w: 3, h: 1 },
    { id: 2, q:3, name: "small-room", w: 3, h: 3 },
    { id: 3, q:3, name: "medium-room", w: 5, h: 3 },
    { id: 4, q:3, name: "big-room", w: 7, h: 3 },
    { id: 5, q:3, name: "tall-room", w: 3, h: 6 },
    { id: 6, q:4, name: "doll", w: 1, h: 2 },

    { id: 7, q:1, name: "toilet", w: 1, h: 1 },
    { id: 8, q:1, name: "shower", w: 1, h: 3 },
    { id: 9, q:1, name: "bathtub", w: 3, h: 1 },

    { id: 10, q:1, name: "bed", w: 3, h: 1 },
    { id: 11, q:1, name: "tv", w: 1, h: 1 },

    { id: 12, q:1, name: "coach", w: 3, h: 1 },
    { id: 13, q:1, name: "table", w: 3, h: 2 },
    { id: 14, q:1, name: "big-tv", w: 2, h: 1 },

    { id: 15, q:1, name: "stove", w: 2, h: 2 },
    { id: 16, q:1, name: "kitchen-table", w: 2, h: 2 },

    { id: 16, q:1, name: "bench", w: 2, h: 1 },
    { id: 17, q:1, name: "plant", w: 1, h: 2 },
    { id: 18, q:2, name: "painting", w: 1, h: 1 },

    { id: 19, q:1, name: "car", w: 3, h: 2 },

    { id: 20, q:2, name: "cat", w: 1, h: 1 },

    { id: 21, q:3, name: "dog", w: 1, h: 1 },
    { id: 22, q:1, name: "parrot", w: 1, h: 1 },






];


export const [ROWS, COLS, SIZE] = [11, 12, 40];
export default class DollHouseBoard extends React.Component {
    onClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log("click>", rect, e.pageX, e.clientX, e.offsetX);

        const C = Math.floor(x / SIZE);
        const R = Math.floor(y / SIZE);
        console.log("onclick", x, y, R, C);
        this.props.moves.clickCell(R, C);
        this.props.moves.endRound();
    }

    onCardClick(cn) {
        this.props.moves.clickCard(cn);
    }

    onCardSelect(cn) {
        console.log('onCardSelect', cn);
        this.props.moves.selectCard(cn);
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

        let discard = this.props.G.discard.map((c,k)=>(<div key={"discarted"+k} card={c}>{CARDS[c].name}</div>))

        let deck = this.props.G.deck.map((c,k)=>(<div key={"deck"+k} card={c}>{CARDS[c].name}</div>))

        return (
            <div id="dollhouse-game">
                <img id="logo" src={logo} alt="Dollhouse & Write" height="180" />
                <div id="cardroll">
                    <Card card={CARDS[this.props.G.card1]} onCardSelect={() => {this.onCardSelect(0) }} selected={this.props.G.cardSelected === 0} />
                    <Card card={CARDS[this.props.G.card2]} onCardSelect={() => { this.onCardSelect(1) }} selected={this.props.G.cardSelected === 1} />
                    <Card card={CARDS[this.props.G.card3]} onCardSelect={() => { this.onCardSelect(2) }} selected={this.props.G.cardSelected === 2} />
                </div>
                <div id="paper" style={{ width: (COLS + 2) * SIZE, height: ROWS * SIZE }}>
                    <div id="board" style={{ width: (COLS + 2) * SIZE, height: ROWS * SIZE }} onClick={(e) => { this.onClick(e) }}>
                        {itens}
                    </div>
                </div>
                <div id="scoresheet">
                    <div>Bed Room</div>
                    <div>Kitchen</div>
                    <div>Bathroom</div>
                </div>
                <div id="carddecks">
                <div id="deck">Deck: {deck}</div>
                <div id="discard">Discard: {discard}</div>
                </div>
                <div id="cardselector">
                    {cards[this.props.G.cn]}
                    {cards}
                </div>
            </div>
        );
    }
}