import React from 'react';
import prod1 from '../../assets/prod1.jpg';
import prod4 from '../../assets/prod4.jpg';
import ProductCard from '../ProductCard/ProductCard';
import "./MainContent.css";

function MainContent(){
    return (
        <div className="maincontent-container">

            <ProductCard imgsrc={prod1} title="Title" price="Rs. 0.0" ratings="4.9/5" />
            <ProductCard imgsrc={prod4} title="Title" price="Rs. 0.0" ratings="4.3/5" />
            <ProductCard imgsrc={prod1} title="Title" price="Rs. 0.0" ratings="4.5/5" />
            <ProductCard imgsrc={prod1} title="Title" price="Rs. 0.0" ratings="4.9/5" />
        
        </div>
    )
}

export default MainContent;