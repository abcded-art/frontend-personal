import config from '../../../config.js';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../assets/styles/TVShopping.css';
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

function TVShopping( {selectedDate, onScrollToCurrentHour } ) {
    const [selectedMalls, setSelectedMalls] = useState([0, 1, 2]);
    const [isSelecting, setIsSelecting] = useState(-1);
    const [tempSelection, setTempSelection] = useState([0, 1, 2]);
    const [liveData, setLiveData] = useState({
        cjonstyle: { products: [] },
        gsshop: { products: [] },
        hmall: { products: [] },
        lotteimall: { products: [] }
    });
    const [loading, setLoading] = useState(true);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];
    const dateStr = selectedDate.toISOString().split('T')[0];

    console.log("Here is the debug of the date strings");
    console.log(selectedDate);
    console.log(dateStr);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { backendAddr, backendPort } = config;

                const [cjonstyleRes, gsshopRes, hmallRes, lotteimallRes] = await Promise.all([
                    axios.get(`http://${backendAddr}:${backendPort}/api/live/mainlist?site_name=cjonstyle&date=${dateStr}`),
                    axios.get(`http://${backendAddr}:${backendPort}/api/live/mainlist?site_name=gsshop&date=${dateStr}`),
                    axios.get(`http://${backendAddr}:${backendPort}/api/live/mainlist?site_name=hmall&date=${dateStr}`),
                    axios.get(`http://${backendAddr}:${backendPort}/api/live/mainlist?site_name=lotteimall&date=${dateStr}`),
                ]);

                const groupByHour = (productList) => {
                    const grouped = {};
                    productList.forEach(product => {
                        const hour = product.start_time.split(':')[0];
                        if (!grouped[hour]) grouped[hour] = [];
                        grouped[hour].push(product);
                    });
                    return grouped;
                };

                const newLiveData = {
                    cjonstyle: cjonstyleRes.data.result ? { products: groupByHour(cjonstyleRes.data.result.product_list) } : { products: {} },
                    gsshop: gsshopRes.data.result ? { products: groupByHour(gsshopRes.data.result.product_list) } : { products: {} },
                    hmall: hmallRes.data.result ? { products: groupByHour(hmallRes.data.result.product_list) } : { products: {} },
                    lotteimall: lotteimallRes.data.result ? { products: groupByHour(lotteimallRes.data.result.product_list) } : { products: {} }
                };

                setLiveData(newLiveData);
                setLoading(false);

                if (dateStr === today) {
                    onScrollToCurrentHour();
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
                setLiveData({
                    cjonstyle: { products: {} },
                    gsshop: { products: {} },
                    hmall: { products: {} },
                    lotteimall: { products: {} }
                });
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedDate, onScrollToCurrentHour]);

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

    const renderTimeBar = () => {
        const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');
    
        return hours.map(hour => (
            <div key={hour} className={`hourGroup ${hour === currentHour ? 'currentHour' : ''}`} id={`hour-${hour}`}>
                <div className='hourLabel'>{`${hour}:00`}</div>
                <div className='hourContent'>
                    {selectedMalls.map((mallIndex, position) => {
                        const site = liveData[mallNames[mallIndex]].products;
                        const productsInHour = site[hour] || [];
                        
                        // Sorting products: first by 'now_live_yn' and then by 'start_time'
                        const sortedProducts = [...productsInHour].sort((a, b) => {
                            if (a.now_live_yn === b.now_live_yn) {
                                return a.start_time.localeCompare(b.start_time);
                            }
                            return a.now_live_yn === "Y" ? -1 : 1;
                        });
    
                        return (
                            <div key={position} className="mallSelection">
                                {sortedProducts.map((product, iter) => (
                                    <div key={iter} className="product">
                                        <Link to={`/product/${product.p_id}`} className='customLink'>
                                            <div className='productImageAlign'>
                                                <div className='productImageFix' style={{ position: 'relative' }}>
                                                    <img src={product.img_url} alt={product.p_name} />
                                                    {dateStr === today && product.now_live_yn === "Y" && (
                                                        <div className='liveSign'>Live</div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className='productName'>{product.p_name}</p>
                                            <p className='productPrice'>{ product.p_price ? product.p_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원`: `상담문의`} </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        ));
    };

    if (loading) {
        return <div> Loading.... </div>
    }

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
                                                        onChange={ () => handleRadioChange(i, position) }
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
                                    <button onClick={handleConfirmSelection} className='confirmButton'>확인</button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
            <div className='mallsContainer'>
                {renderTimeBar()}
            </div>
        </div>
    );
}

export default TVShopping;