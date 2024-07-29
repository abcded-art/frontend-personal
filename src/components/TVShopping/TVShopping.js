import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { BiBell } from "react-icons/bi"; 알람 기능 사용할 때 키기
import { GiTalk } from "react-icons/gi";
import '../../assets/styles/TVShopping.css';
import classNames from 'classnames';
import SetAlert from './SetAlert';
import cjonstyleImage from '../../assets/images/Malls/CJOnStyle.png';
import hyundaiImage from '../../assets/images/Malls/Hyundai.png';
import gsshopImage from '../../assets/images/Malls/GSShop.png';
import lotteImage from '../../assets/images/Malls/Lotte.png';
import { config } from '../../config.js';

const { backendAddr } = config;

const mallImages = {
    cjonstyle: cjonstyleImage,
    gsshop: gsshopImage,
    hmall: hyundaiImage,
    lotteimall: lotteImage,
};

const ProductItem = React.memo(({ product, isBeforeLive, showAlert, dateStr, today, similarProducts, isDarkMode }) => {
    const [productReviewExplainVisible, setProductReviewExplainVisible] = useState(false);

    const productPrice = product.p_price ? parseInt(product.p_price.replace(/,/g, ''), 10) : null;
    const similarProductPrice = similarProducts[0] && similarProducts[0].price ? parseInt(similarProducts[0].price.replace(/,/g, ''), 10) : null;

    const toggleProductReviewExplainVisible = () => {
        setProductReviewExplainVisible(prev => !prev);
    };

    useEffect(() => {
        let productReviewExplainTimeout;
        if (productReviewExplainVisible) {
            productReviewExplainTimeout = setTimeout(() => {
                setProductReviewExplainVisible(false);
            }, 3500);
        }
        return () => clearTimeout(productReviewExplainTimeout);
    }, [productReviewExplainVisible]);

    return (
        <div className="product">
            <div className='productImageAlignBox'>
                <div className='tvShopping__divForAlertAlignBox'>
                    {/* 과거 버전에서 알림을 알리고자 했던 부분
                        {isBeforeLive ? (
                        <div className='alert'>
                            <BiBell className='alertBell' onClick={showAlert} />
                        </div>
                    ) : (
                        <div></div>
                    )} */}
                    <div />
                    <div className='divForAlertAlign'>
                        <div className={classNames(`productReviewExplain ${productReviewExplainVisible ? 'visible' : ''}`, { 'dark': isDarkMode })}>
                            본 상품은 인공지능 리뷰 분석이 된 상품입니다.
                            상품 상세 페이지에서 자세한 내용을 확인 할 수 있습니다.
                        </div>
                        {product.review_yn === 'Y' && (
                            <GiTalk className='reviewAvailableBadge' onClick={toggleProductReviewExplainVisible} />
                        )}
                    </div>
                </div>

                <Link to={`/product/${product.p_id}`} className='TVShopping__customLink productImageFix'>
                    <div className='productImageWrapper'>
                        <img src={product.img_url} alt={product.p_name} className='productImage' />
                        {dateStr === today && product.now_live_yn === "Y" && (
                            <div className='liveSign'>Live</div>
                        )}
                    </div>

                    <div className='TVShopping__product-logo'>
                        <img
                            src={mallImages[product.site_name]}
                            alt={product.site_name}
                        // className='productMallLogo'
                        />
                    </div>
                </Link>
            </div>
            <div className='productInfoBox'>
                <div className='productFirstRow'>
                    <Link to={`/product/${product.p_id}`} className='customLink productName'>{product.p_name}</Link>
                    <div className='productFirstRow-logo-price'>
                        {/* 과거 버전에서 로고를 표시했던 부분
                        <div className='logoContainer'>
                            <img
                                src={mallImages[product.site_name]}
                                alt={product.site_name}
                                className='productMallLogo'
                            />
                        </div> */}
                        <p className='productPrice'>{product.p_price ? product.p_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `상담문의`}</p>
                    </div>
                    <div className='high-low'>
                        {/* 과거 버전에서 상품의 가격이 높냐 낮냐를 표시했던 부분
                            {productPrice !== null && similarProductPrice !== null ? (
                            productPrice > similarProductPrice ? <FaArrowUp className='arrow arrowUp' /> :
                                productPrice < similarProductPrice ? <FaArrowDown className='arrow arrowDown' /> : <FaEquals className='arrow arrowEqual' />
                        ) : ''} 
                         */}
                    </div>
                </div>
                <div className='productSecondRow'>
                    {productPrice !== null && similarProductPrice !== null ? (
                        productPrice > similarProductPrice ? (
                            <div>본 상품은 최저가보다 <span className='productSecondRow-high'>{
                                (productPrice - similarProductPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            } 원</span> 비쌉니다</div>
                        ) : productPrice < similarProductPrice ? (
                            <div>본 상품은 최저가보다 <span className='productSecondRow-low'>{
                                (similarProductPrice - productPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            } 원</span> 저렴합니다</div>
                        ) : (
                            <div>본 상품은 최저가와 가격이 동일합니다</div>
                        )
                    ) : ''

                    }
                </div>
                <div className='productThirdRow'>
                    {similarProducts.map((similarProduct, idx) => (
                        <div key={idx} className='tvShopping__similarProduct'>
                            {similarProduct ? (
                                <Link to={similarProduct.redirect_url} className='tvShopping__similarProductLink' target='_blank' rel="noopener noreferrer">
                                    <div className='tvShopping__similarProductElementWrapper'>
                                        <div className='tvShopping__similarProductImageWrapper'>
                                            <img src={similarProduct.image_url} alt={similarProduct.product_name} className='tvShopping__similarProductImage' />
                                        </div>
                                        <div className='tvShopping__seller'>{similarProduct.seller}</div>
                                        <div className='tvShopping__price'>{similarProduct.price ? similarProduct.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `상담문의`}</div>
                                    </div>
                                </Link>
                            ) : (
                                <div className='tvShopping__empty'></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

function TVShopping({ selectedDate, onScrollToCurrentHour, selectedMalls, isDarkMode }) {
    const [liveData, setLiveData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [isMallSelection, setIsMallSelection] = useState(false);
    const [allMallsData, setAllMallsData] = useState([]);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];
    const dateStr = selectedDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];


    // // Delete After
    // const backendAddr = process.env.REACT_APP_BACKEND_ADDR;
    // // Use this address when you seperate address and port.
    // // const backendPort = process.env.REACT_APP_BACKEND_PORT;

    const fetchData = useCallback(async () => {
        setLoading(true);
        if (selectedMalls.length === 0) {
            console.warn("쇼핑사 선택이 안됐다.");
            setLiveData({});
            setLoading(false);
            return;
        }

        const startTime = performance.now();
        try {
            // Use this address when you seperate address and port.
            // const apiUrl = `http://${backendAddr}:${backendPort}/api/live/mainlist?date=${dateStr}&site_name=cjonstyle,hmall,lotteimall,gsshop`;
            const apiUrl = `${backendAddr}/api/live/mainlist?date=${dateStr}&site_name=cjonstyle,hmall,lotteimall,gsshop`;
            const response = await axios.get(apiUrl);

            const allData = response.data.result.product_list;
            console.log(allData);

            const groupByHour = (productList) => {
                const grouped = {};
                productList.forEach(product => {
                    const hour = product.start_time.split(':')[0];
                    if (!grouped[hour]) grouped[hour] = [];
                    grouped[hour].push(product);
                });
                return grouped;
            };

            const groupedData = groupByHour(allData);
            setLiveData(groupedData);
            setAllMallsData(allData);
            setLoading(false);

            if (dateStr === today && !isMallSelection) {
                onScrollToCurrentHour();
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
            setLoading(false);
        } finally {
            const endTime = performance.now();
            console.log(`FetchData: 날짜 ${dateStr}의 쇼핑몰 ${selectedMalls} API 호출하는 데에 ${endTime - startTime}ms 걸렸다.`);
        }
    }, [selectedMalls, dateStr, today, onScrollToCurrentHour, isMallSelection]);

    useEffect(() => {
        fetchData();
    }, [dateStr]);

    useEffect(() => {
        setIsMallSelection(selectedMalls.length > 0);
    }, [selectedMalls]);

    useEffect(() => {
        if (dateStr === today) {
            onScrollToCurrentHour();
        }
        setIsMallSelection(false);
    }, [selectedDate, dateStr, today]);

    useEffect(() => {
        if (dateStr === today) {
            let attempts = 0;
            const interval = setInterval(() => {
                const currentHourElement = document.getElementById(`hour-${new Date().getHours().toString().padStart(2, '0')}`);
                if (currentHourElement || attempts >= 20) {
                    clearInterval(interval);
                    if (currentHourElement) {
                        window.scrollTo({
                            top: currentHourElement.offsetTop - (window.innerHeight * 0.08),
                            // behavior: 'smooth'
                            behavior: 'instant'
                        });
                    }
                }
                attempts++;
            }, 500);
        }
    }, [dateStr, liveData]);

    const renderTimeBar = useMemo(() => {
        const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');

        return hours.map(hour => (
            <div key={hour} className={`hourGroup ${hour === currentHour ? 'currentHour' : ''}`} id={`hour-${hour}`}>
                <div className={`hourLabel ${isDarkMode ? 'dark-mode' : ''}`}>{`${hour}:00`}</div>
                <div className={`hourContent ${isDarkMode ? 'dark-mode' : ''}`}>
                    {(liveData[hour] || []).filter(product => selectedMalls.includes(product.site_name)).map((product, index) => {
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
                                isDarkMode={isDarkMode}
                            />
                        );
                    })}
                </div>
            </div>
        ));
    }, [liveData, dateStr, today, selectedMalls, isDarkMode]);

    if (loading) {
        return <div className='loadingMessage'>{dateStr}<br />데이터 로딩중...</div>;
    }

    return (
        <div className={`Main ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className='mallsContainer'>
                {Object.keys(liveData).length === 0 || selectedMalls.length === 0 ? (
                    <div className='emptyMessage'>상품이 없습니다</div>
                ) : (
                    renderTimeBar
                )}
            </div>
            <SetAlert show={showAlert} onClose={() => setShowAlert(false)} />
        </div>
    );
}

export default TVShopping;