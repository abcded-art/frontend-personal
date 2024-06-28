import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../assets/styles/TVShopping.css';
import SetAlert from './SetAlert';
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

function TVShopping({ selectedDate, onScrollToCurrentHour, selectedMalls }) {
    const [liveData, setLiveData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [isMallSelection, setIsMallSelection] = useState(false);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];
    const dateStr = selectedDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];

    // Delete after
    // const backendAddr = process.env.REACT_APP_BACKEND_ADDR;
    // const backendPort = process.env.REACT_APP_BACKEND_PORT;

    const fetchData = useCallback(async () => {
        if (selectedMalls.length === 0) {
            console.warn("No malls selected. Skipping API call.");
            setLiveData({});
            setLoading(false);
            return;
        }

        const startTime = performance.now();
        try {
            const apiUrl = `http://${backendAddr}:${backendPort}/api/live/mainlist?date=${dateStr}&site_name=${selectedMalls.join(',')}`;
            const response = await axios.get(apiUrl);

            const allData = response.data.result.product_list;

            const filteredData = selectedMalls.reduce((acc, mall) => {
                return acc.concat(allData.filter(product => product.site_name === mall));
            }, []);

            const groupByHour = (productList) => {
                const grouped = {};
                productList.forEach(product => {
                    const hour = product.start_time.split(':')[0];
                    if (!grouped[hour]) grouped[hour] = [];
                    grouped[hour].push(product);
                });
                return grouped;
            };

            const groupedData = groupByHour(filteredData);
            setLiveData(groupedData);
            setLoading(false);

            if (dateStr === today && !isMallSelection) {
                onScrollToCurrentHour();
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
            setLoading(false);
        } finally {
            const endTime = performance.now();
            console.log(`날짜 ${dateStr}의 쇼핑몰 ${selectedMalls} API 호출하는 데에 ${endTime-startTime}ms 걸렸습니다.`);
        }
    }, [selectedMalls, dateStr, today, onScrollToCurrentHour, isMallSelection]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    useEffect(() => {
        setIsMallSelection(selectedMalls.length > 0);
    }, [selectedMalls]);
    
    useEffect(() => {
        if (dateStr === today) {
            onScrollToCurrentHour();
        }
        setIsMallSelection(false);
    }, [selectedDate, dateStr, today, onScrollToCurrentHour]);

    const renderTimeBar = useMemo(() => {
        const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');

        return hours.map(hour => (
            <div key={hour} className={`hourGroup ${hour === currentHour ? 'currentHour' : ''}`} id={`hour-${hour}`}>
                <div className='hourLabel'>{`${hour}:00`}</div>
                <div className='hourContent'>
                    {(liveData[hour] || []).map((product, index) => {
                        const liveStartTime = new Date(`${dateStr}T${product.start_time}:00`);
                        const isBeforeLive = now < liveStartTime;
                        const similarProducts = [...product.similar_product_list, ...Array(3 - product.similar_product_list.length).fill(null)];
                        
                        return (
                            <ProductItem
                                key={index}
                                product={product}
                                isBeforeLive={isBeforeLive}
                                showAlert={() => setShowAlert(true)}
                                dateStr={dateStr}
                                today={today}
                                similarProducts={similarProducts}
                            />
                        );
                    })}
                </div>
            </div>
        ));
    }, [liveData, dateStr, today]);

    if (loading) {
        return <div>Loading....</div>;
    }

    return (
        <div className='Main'>
            <div className='mallsContainer'>
                {renderTimeBar}
            </div>
            <SetAlert show={showAlert} onClose={() => setShowAlert(false)} />
        </div>
    );
}

const ProductItem = React.memo(({ product, isBeforeLive, showAlert, dateStr, today, similarProducts }) => { // Added similarProducts to props
    return (
        <div className="product">
            {isBeforeLive && (
                <div className='divForAlertAlign'>
                    <div className='alert' onClick={showAlert}>
                        🔔
                    </div>
                </div>
            )}
            <div className='productImageAlign'>
                <div className='productImageFix'>
                    <Link to={`/product/${product.p_id}`} className='customLink'>
                        <img src={product.img_url} alt={product.p_name} />
                        {dateStr === today && product.now_live_yn === "Y" && (
                            <div className='liveSign'>Live</div>
                        )}
                    </Link>
                </div>
            </div>
            <div className='productInfoBox'>
                <div className='productFirstRow'>
                    <Link to={`/product/${product.p_id}`} className='customLink productName'>{product.p_name}</Link>
                    <div className='productFirstRow-logo-price'>
                        <div className='logoContainer'>
                            <img
                                src={mallImages[product.site_name]}
                                alt={product.site_name}
                                className='productMallLogo'
                            />
                        </div>
                        <p className='productPrice'>{product.p_price ? product.p_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `상담문의`}</p>
                    </div>
                    <div className='high-low'>
                        hi
                    </div>
                </div>
                <div className='productSecondRow'>
                    {similarProducts.map((similarProduct, idx) => (
                        <div key={idx} className='similarProduct'>
                            {similarProduct ? (
                                <Link to={similarProduct.redirect_url} className='customLink'>
                                    <div className='similarProductImageWrapper'>
                                        <img src={similarProduct.image_url} alt={similarProduct.product_name} className='similarProductImage'/>
                                    </div>
                                    <div className='seller'>{similarProduct.seller}</div>
                                    <div className='price'>{similarProduct.price ? similarProduct.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `상담문의`}</div>
                                </Link>
                            ) : (
                                <div className='empty'></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default TVShopping;