import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../../assets/styles/HotProduct.css';

function HotProduct({selectedDate}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const dateStr = selectedDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];

    // Delete after
    const backendAddr = process.env.REACT_APP_BACKEND_ADDR;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;

    const [productImages, setProductImages] = useState([
        {
            img_url: "https://thumb.cjonstyle.net/unsafe/fit-in/236x236/itemimage.cjonstyle.net/goods_images/20/542/2033496542L.jpg?timestamp=20240530115951",
            discount: "48",
            p_name: "Lorem First",
            p_price: "50000",
            link: "#FirstIpsum",
        },
        {
            img_url: "https://thumb.cjonstyle.net/unsafe/fit-in/236x236/itemimage.cjonstyle.net/goods_images/20/270/2029650270L.jpg?timestamp=20240405143019",
            discount: "47",
            p_name: "Lorem Second",
            p_price: "30000",
            link: "#SecondIpsum",
        },
        {
            img_url: "https://thumbnail6.coupangcdn.com/thumbnails/remote/292x292ex/image/retail/images/4454252671928722-3291f645-9738-44fb-9541-c06ed9b95ffc.jpg",
            discount: "33",
            p_name: "Lorem Third",
            p_price: "40000",
            link: "#SecondIpsum",
        }
    ]);

    const fetchData = useCallback(async() => {
        const startTime = performance.now();
        try{
            const apiUrl = `http://${backendAddr}:${backendPort}/api/live/hotdeallist?date=${dateStr}`
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
        } finally{
            const endTime = performance.now();
            console.log(`핫프로덕트는 ${endTime - startTime}만큼의 시간이 걸렸다.`);
        }
    });

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
    }, []);

    const currentProduct = productImages[currentIndex] || {};

    return (
        <div className='HotProductOuterContainer'>
            <div class='todaysHotDealProduct'>오늘의 핫딜상품</div>
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
                <div> 로딩중이다</div>
            )}
        </div>
    );
}

export default HotProduct;