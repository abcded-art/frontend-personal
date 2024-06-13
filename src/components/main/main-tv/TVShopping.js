import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/TVShopping.css';
import liveData from '../../../sampleDatas/GetLives.json';
import cjonstyleImage from '../../../assets/images/Malls/CJOnStyle.png';
import hyundaiImage from '../../../assets/images/Malls/Hyundai.png';
import gsshopImage from '../../../assets/images/Malls/GSShop.png';
import lotteImage from '../../../assets/images/Malls/Lotte.png';

const mallImages = {
    cjonstyle: cjonstyleImage,
    gsshop: gsshopImage,
    hmall: hyundaiImage,
    lotteimall: lotteImage,
};

const mallNames = ["cjonstyle", "gsshop", "hmall", "lotteimall"];

function TVShopping() {
    const [selectedMalls, setSelectedMalls] = useState([0, 1, 2]);
    const [isSelecting, setIsSelecting] = useState(-1);
    const [tempSelection, setTempSelection] = useState([0, 1, 2]);

    const handleMallClick = (index) => {
        setIsSelecting(index);
        setTempSelection([...selectedMalls]);
    };

    const handleConfirmSelection = () => {
        setSelectedMalls(tempSelection);
        setIsSelecting(-1);
    };

    const handleRadioChange = (mallIndex, position) => {
        const newSelection = [...tempSelection];
        newSelection[position] = mallIndex;
        setTempSelection(newSelection);
    };

    return (
        <div className='Main'>
            <div className='mallSelectionButtons'>
                {
                    selectedMalls.map((mallIndex, position) => (
                        <div key={position} className='mallLogoContainer'>
                            <div onClick={() => handleMallClick(position)} className='fixMallLogoSize'>
                                <img
                                    src={mallImages[mallNames[mallIndex]]}
                                    alt={mallNames[mallIndex]}
                                    className='mallLogo'
                                />
                            </div>
                            {isSelecting === position && (
                                <div className={`radioToggle ${isSelecting === position ? 'show' : ''}`} >
                                    <section className="radio-section">
                                        <div className="radio-list">
                                            {mallNames.map((mallName, i) => (
                                                <div key={i} className="radio-item">
                                                    <input
                                                        type='radio'
                                                        id={`${position}-${i}`}
                                                        name={`mall-${position}`}
                                                        value={i}
                                                        checked={tempSelection[position] === i}
                                                        onChange={() => handleRadioChange(i, position)}
                                                    />
                                                    <label htmlFor={`${position}-${i}`}>
                                                        <img
                                                            src={mallImages[mallName]}
                                                            alt={mallName}
                                                            className='radioMallLogo'
                                                        />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <button onClick={handleConfirmSelection} className='confirmButton'>Confirm</button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
            <div className='mallsContainer'>
                {selectedMalls.map((mallIndex, position) => {
                    const site = liveData.find(site => site.site_name === mallNames[mallIndex]);
                    return (
                        <div key={position} className='mallSelection'>
                            {site.products.map((product, iter) => (
                                <div key={iter} className="product">
                                    <Link to={`/product/${product.p_id}`} className='customLink'>
                                        <div className='productImageAlign'>
                                            <div className='productImageFix'>
                                                <img src={product.img_url} alt={product.p_name} />
                                            </div>
                                        </div>
                                        <p className='productName'>{product.p_name}</p>
                                        <p className='productPrice'>{product.p_price}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TVShopping;