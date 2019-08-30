import React from 'react';
import "./DollHouseBoard.css";

export const [ROWS, COLS, SIZE] = [9, 12, 40];
export default class DollHouseBoard extends React.Component {
    onClick(e) {
        const x = e.clientX;
        const y = e.clientY;
        const C = Math.floor(x / 40);
        const R = Math.floor(y / 40)-this.props.G.sh+1;
        console.log(x,y,R,C);
        this.props.moves.clickCell(R,C);
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
        this.props.G.reserve.map((r)=><div style={{
            width:  r.w*SIZE+"px",
            height: r.h*SIZE+"px",
            left:   r.c*SIZE+"px",
            top:   r.r*SIZE+"px",
        }} className="room"></div>);
        

       

        return (
                <div id="board" style={{width: COLS*SIZE, height: ROWS*SIZE}} onClick={(e)=>{this.onClick(e)}}>
                    {itens}
                </div>
        );
    }
}