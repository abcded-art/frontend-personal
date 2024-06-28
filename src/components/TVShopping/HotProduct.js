import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../assets/styles/HotProduct.css';

function HotProduct({ selectedDate }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const dateStr = selectedDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });

    // 환경 변수 설정
    const backendAddr = process.env.REACT_APP_BACKEND_ADDR;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;

    const [productImages, setProductImages] = useState([]);

    const fetchData = useCallback(async () => {
        const startTime = performance.now();
        try {
            const apiUrl = `http://${backendAddr}:${backendPort}/api/live/hotdeallist?date=${dateStr}`;
            const response = await axios.get(apiUrl);
            setProductImages(response.data.result.product_list.map(product => ({
                img_url: product.img_url,
                discount: product.price_difference,
                p_name: product.p_name,
                p_price: product.p_price,
                link: `#${product.p_id}`,
            })));
        } catch (error) {
            console.error('핫딜상품에서 에러났다', error);
        } finally {
            const endTime = performance.now();
            // console.log(`핫프로덕트는 ${endTime - startTime}만큼의 시간이 걸렸다.`);
        }
    }, [dateStr, backendAddr, backendPort]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
                setIsAnimating(false);
            }, 500);
        }, 5000);
        return () => clearInterval(interval);
    }, [productImages.length]);

    const currentProduct = productImages[currentIndex] || {};

    return (
        <div className='HotProductOuterContainer'>
            <div className='todaysHotDealProduct'>오늘의 핫딜상품</div>
            {productImages.length > 0 ? (
                <a href={currentProduct.link} className={`hotProductBox ${isAnimating ? 'swipe' : ''}`}>
                    <div className='hotProductFirstRow'>
                        <div className='hotProductImage'>
                            <img src={currentProduct.img_url} alt={currentProduct.p_name} />
                        </div>
                        <div className='hotProductSales'>
                            {currentProduct.discount}% 저렴
                        </div>
                    </div>
                    <div className='hotProductSecondRow'>
                        <div className='hotProductName'>
                            {currentProduct.p_name}
                        </div>
                    </div>
                    <div className='hotProductThirdRow'>
                        <div className='hotProductPrice'>
                            {currentProduct.p_price} 원
                        </div>
                    </div>
                </a>
            ) : (
                <div>로딩중이다</div>
            )}
        </div>
    );
}

export default HotProduct;