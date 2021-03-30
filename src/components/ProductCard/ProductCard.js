import React from 'react';
import './ProductCard.css';

export default function ProductCard(props){
    return (
        <div className="maincontent-container-item">
            <div className="maincontent-container-item__image">
                <img src={props.imgsrc} alt="product one" />
                <div className="productcard-overlay">
                    <div className="productcard-overlay__iconLinks">Buy Now</div>
                </div>
            </div>
            <div className="maincontent-container-item__info">
                <div className="maincontent-container-item__info-title">
                    <h3>{props.title}</h3>
                </div>
                <div className="maincontent-container-item__info-subinfo">
                    <p>{props.price}</p>
                    <p>{props.ratings}</p>
                </div>
            </div>
        </div>
    )
}