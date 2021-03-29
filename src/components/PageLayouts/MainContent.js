import React from 'react';
import prod1 from '../../assets/prod1.jpg';
import prod4 from '../../assets/prod4.jpg';
import "./MainContent.css";

function MainContent(){
    return (
        <div className="maincontent-container">

            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod1} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>

            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod4} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>

            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod4} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>
            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod1} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>

            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod1} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>

            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod4} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>

            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod4} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>
            <div className="maincontent-container-item">
                <div className="maincontent-container-item__image">
                    <img src={prod1} alt="product one" />
                </div>
                <div className="maincontent-container-item__info">
                    <div className="maincontent-container-item__info-title">Title</div>
                    <div className="maincontent-container-item__info-subinfo">Subinfo</div>
                </div>
            </div>

        </div>
    )
}

export default MainContent;