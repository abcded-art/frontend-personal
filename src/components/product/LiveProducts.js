import config from '../../config';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LiveVideo from './lives/LiveVideo.js';
import axios from 'axios';
import '../../assets/styles/LiveProducts.css';
import cjonstyleImage from '../../assets/images/Malls/CJOnStyle.png'
import hyundaiImage from '../../assets/images/Malls/Hyundai.png'
import gsshopImage from '../../assets/images/Malls/GSShop.png'
import lotteImage from '../../assets/images/Malls/Lotte.png'

const mallImages = {
    cjonstyle: cjonstyleImage,
    gsshop: gsshopImage,
    hmall: hyundaiImage,
    lotteimall: lotteImage,
}

function LiveProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState([null]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const liveVideoUrls = {
        cjonstyle: "https://live-ch1.cjonstyle.net/cjmalllive/_definst_/stream2/playlist.m3u8",
        gsshop: "https://gstv-gsshop.gsshop.com/gsshop_hd/_definst_/gsshop_hd.stream/chunklist.m3u8",
        hmall: "https://cdnlive.hmall.com/live/hmall.stream/chunklist.m3u8",
        lotteimall: "https://mohlslive.lotteimall.com/live/livestream/chunklist.m3u8",
    };

    const posterUrl = '//thumb.cjonstyle.net/unsafe/410x230/itemimage.cjonstyle.net/goods_images/20/901/2032168901L.jpg?timestamp=20240507110833';

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { backendAddr, backendPort } = config;
                const productResponse = await axios.get(`http://${backendAddr}:${backendPort}/api/live/details?product_id=${id}`);
                console.log("Product Details Response: ", productResponse.data);
                setProduct(productResponse.data.details);
            } catch (error) {
                console.error("Failed to fetch product details", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        const fetchSimilarProducts = async () => {
            try {
                const { backendAddr, backendPort } = config;
                const similarResponse = await axios.get(`http://${backendAddr}:${backendPort}/api/compare/details?product_id=${id}`);
                console.log("Similar products response: ", similarResponse);
                const sortedProducts = similarResponse.data.result.product_list.sort((a,b) => a.s_price - b.s_price);
                setSimilarProducts(sortedProducts);
                setDisplayedProducts(sortedProducts.slice(0,5));
                // setSimilarProducts(similarResponse.data.result.product_list);
                // setDisplayedProducts(similarResponse.data.result.product_list.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch similar products", error);
                setSimilarProducts([]);
            }
        };

        fetchProductDetails();
        fetchSimilarProducts();
    }, [id]);

    const handleShowMore = () => {
        const currentCount = displayedProducts.length;
        const nextCount = currentCount + 5;
        setDisplayedProducts(similarProducts.slice(0, nextCount));
    };

    if (loading) {
        return <h1> Loading ... </h1>;
    }

    if (!product) {
        return <h1> Product not found </h1>;
    }

    const liveVideoUrl = liveVideoUrls[product.site_name];

    return (
        <>
            <div className='products'>
                <div className="mainLiveProducts">
                    <div className="liveVideoFrame">
                        {product.now_live_yn === "Y" ? (
                            <LiveVideo src={liveVideoUrl} className="liveVideo" />
                        ) : (
                            <img src={product.img_url} alt={product.p_name} className="productImage" />
                        )}
                    </div>
                    <div className="liveProductInfo">
                        <div className="liveProduct-first-row">
                            <img src={mallImages[product.site_name]} alt={product.site_name} className="shoppingMallLogoImage" />
                            <div className="liveProduct-nowStart-or-willStart">
                                {product.now_live_yn === "Y" ? "Now Live" : ""}
                            </div>
                        </div>
                        <div className="liveProduct-second-row">
                            <div className="productName">{product.p_name}</div>
                        </div>
                        <div className="liveProduct-last-row">
                            <div className="liveProduct-price">{product.p_price ? product.p_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `상담문의`}</div>
                            <a href={product.redirect_url} className="liveProduct-link" target='_blank' rel="noopener noreferrer">구매하러 가기</a>
                        </div>
                    </div>
                </div>
                <div className="relatedProducts">
                    <h4 className='priceCompare'>가격 비교</h4>
                    <div className='productBucket'>
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((prod, idx) => (
                                <a href={prod.redirect_url} className='similarProduct' key={idx} target='_blank' rel="noopener noreferrer">
                                    <div className='similarProductComponent'>
                                        <img src={prod.img_url} alt={prod.s_name} className="relatedProductImage" />
                                        <div className='relatedProductName'>{prod.s_name}</div>
                                        <div className='relatedProductPrice'>{prod.s_price ? prod.s_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `구매문의`}</div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="noSimilarProducts">비교 상품 없음</div>
                        )}
                    </div>
                    {similarProducts.length > displayedProducts.length && (
                        <button onClick={handleShowMore} className='showMoreButton'>
                            더보기
                        </button>
                    )}
                </div>
                <div className="reviews">
                    <h4 className='priceCompare'>상품 리뷰</h4>
                </div>
                <div className="productDetails">
                    <h4 className='priceCompare'>상품 상세 정보</h4>
                    { product.img_url_details.length > 0 ? (
                        product.img_url_details.map((url, index) => (
                            <img key={index} className='productDetailInfo' src={url} alt={`${id}-${index}`}/>
                        ))
                    ) : (<h4 className="noDetailedProducts">상세 정보 없음</h4>)

                    }
                    
                </div>
            </div>
        </>
    );
}

export default LiveProduct;
