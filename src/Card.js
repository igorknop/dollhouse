import React from "react";
import "./Card.css";

export default function Card(props) {
    return(
    <div className={"card "+(props.selected?"selected":"")} onClick={props.onCardSelect}>
        <div>{props.card.name}</div>
        <div>{props.card.w} X {props.card.h}</div>
    </div>);
}