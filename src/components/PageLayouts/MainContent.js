import React from 'react';
import prod1 from '../../assets/prod1.jpg';
import prod4 from '../../assets/prod4.jpg';
import ProductCard from '../ProductCard/ProductCard';
import "./MainContent.css";

// TODO: Fetch product details from API
let productsFetched = [
    {
        id: 1,
        name: "Product One Name",
        price: 20.00,
        ratings: 4.9,
        imgsrc: prod1
    },
    {
        id: 2,
        name: "Product Two Name",
        price: 2000.00,
        ratings: 4.9,
        imgsrc: prod4
    },
    {
        id: 3,
        name: "Product Three Name",
        price: 200000000.00,
        ratings: 4.9,
        imgsrc: prod1
    },
    {
        id: 1,
        name: "Product One Name",
        price: 20.00,
        ratings: 4.9,
        imgsrc: prod1
    },
    {
        id: 2,
        name: "Product Two Name",
        price: 2000.00,
        ratings: 4.9,
        imgsrc: prod4
    },
    {
        id: 3,
        name: "Product Three Name",
        price: 200000000.00,
        ratings: 4.9,
        imgsrc: prod1
    }
];


function MainContent(){
    return (
        <div className="maincontent-container">
            {productsFetched.map(
                product => {
                    return <ProductCard 
                                imgsrc={product.imgsrc} 
                                title={product.name} 
                                price={product.price} 
                                ratings={product.ratings} 
                            />
                    }
                )
            }
        </div>
    )
}

export default MainContent;