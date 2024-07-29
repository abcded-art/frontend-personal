import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoInformationCircleOutline, IoWarning } from "react-icons/io5";
import axios from 'axios';
import '../../assets/styles/LiveProducts.css';
import LiveVideo from './lives/LiveVideo.js';
import cjonstyleImage from '../../assets/images/Malls/CJOnStyle.png';
import hyundaiImage from '../../assets/images/Malls/Hyundai.png';
import gsshopImage from '../../assets/images/Malls/GSShop.png';
import lotteImage from '../../assets/images/Malls/Lotte.png';
import positiveImage from '../../assets/images/Positive_AI.png';
import negativeImage from '../../assets/images/Negative_AI.png';
import { config } from '../../config.js';

const { backendAddr } = config;

const mallImages = {
    cjonstyle: cjonstyleImage,
    gsshop: gsshopImage,
    hmall: hyundaiImage,
    lotteimall: lotteImage,
};

function LiveProduct({ isDarkMode }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [review, setReview] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [warningInfoVisible, setWarningInfoVisible] = useState(false);
    const [firstDetailVisible, setFirstDetailVisible] = useState(false);
    const [secondDetailVisible, setSecondDetailVisible] = useState(false);

    // // Delete after
    // const backendAddr = process.env.REACT_APP_BACKEND_ADDR;
    // // const backendPort = process.env.REACT_APP_BACKEND_PORT;

    const liveVideoUrls = {
        cjonstyle: "https://live-ch1.cjonstyle.net/cjmalllive/_definst_/stream2/playlist.m3u8",
        gsshop: "https://gstv-gsshop.gsshop.com/gsshop_hd/_definst_/gsshop_hd.stream/chunklist.m3u8",
        hmall: "https://cdnlive.hmall.com/live/hmall.stream/chunklist.m3u8",
        lotteimall: "https://mohlslive.lotteimall.com/live/livestream/chunklist.m3u8",
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Use this when you sperate address and port number.
                const apiUrl = `${backendAddr}/api/live/details?product_id=${id}`;
                // const apiUrl = `http://${backendAddr}:${backendPort}/api/live/details?product_id=${id}`;
                const productResponse = await axios.get(apiUrl);
                console.log("Product Details Response: ", productResponse.data);
                setProduct(productResponse.data.details);
            } catch (error) {
                console.error("Failed to fetch product details", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        const fetchProductReview = async () => {
            try {
                const apiUrl = `${backendAddr}/api/review?product_id=${id}`;
                // const apiUrl = `http://${backendAddr}:${backendPort}/api/review?product_id=${id}`;
                const productReview = await axios.get(apiUrl);
                console.log("Product Review Response: ", productReview.data);
                setReview(productReview.data.result.review_details);
            } catch (error) {
                console.error("Failed to fetch product review", error);
                setReview(null);
            } finally {
                setLoading(false);
            }
        };

        const fetchSimilarProducts = async () => {
            try {
                const apiUrl = `${backendAddr}/api/compare/details?product_id=${id}`;
                // const apiUrl = `http://${backendAddr}:${backendPort}/api/compare/details?product_id=${id}`;
                const similarResponse = await axios.get(apiUrl);
                console.log("Similar products response: ", similarResponse.data);
                const sortedProducts = similarResponse.data.result.similar_products.sort((a, b) => a.s_price - b.s_price);
                setSimilarProducts(sortedProducts);
                setDisplayedProducts(sortedProducts.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch similar products", error);
                setSimilarProducts([]);
            }
        };

        fetchProductDetails();
        fetchProductReview();
        fetchSimilarProducts();
    }, [id]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else{
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    useEffect(() => {
        let warningDetailTimeout;
        if (warningInfoVisible) {
            warningDetailTimeout = setTimeout(() => {
                setWarningInfoVisible(false);
            }, 3500);
        }
        return () => clearTimeout(warningDetailTimeout);
    }, [warningInfoVisible]);
    
    useEffect(() => {
        let firstDetailTimeout;
        if (firstDetailVisible) {
            firstDetailTimeout = setTimeout(() => {
                setFirstDetailVisible(false);
            }, 3500);
        }
        return () => clearTimeout(firstDetailTimeout);
    }, [firstDetailVisible]);

    useEffect(() => {
        let secondDetailTimeout;
        if (secondDetailVisible) {
            secondDetailTimeout = setTimeout(() => {
                setSecondDetailVisible(false);
            }, 3500);
        }
        return () => clearTimeout(secondDetailTimeout);
    }, [secondDetailVisible]);

    const toggleWarningDetail = () => {
        setWarningInfoVisible(!warningInfoVisible);
    };
    const toggleFirstDetail = () => {
        setFirstDetailVisible(!firstDetailVisible);
    };

    const toggleSecondDetail = () => {
        setSecondDetailVisible(!secondDetailVisible);
    };

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
    console.log(review);

    return (
        <>
            <div className={`products ${isDarkMode ? 'dark-mode' : ''}`}>
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
                            <a href={product.redirect_url} className="liveProduct-link" target='_blank' rel="noopener noreferrer">구매 링크</a>
                        </div>
                    </div>
                </div>
                <div className="relatedProducts">
                    <h4 className='priceCompare'>가격 비교</h4>
                    <div className='warningInfo'>
                        <IoWarning className='warningInfoIcon'/>  
                        <div className={`warningInfoDetail`}>
                            방송이 지난 상품의 가격비교는 제공되지 않을 수 있습니다.
                        </div>
                    </div>
                    <div className='productBucket'>
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((prod, idx) => (
                                <Link to={prod.redirect_url} className='similarProduct' key={idx} target='_blank' rel="noopener noreferrer">
                                    <div className='similarProductComponent'>
                                        <img src={prod.image_url} alt={prod.product_name} className="relatedProductImage" />
                                        <div className='relatedProductName'>{prod.seller}</div>
                                        <div className='relatedProductPrice'>{prod.price ? prod.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `구매문의`}</div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="LiveProducts__product-status-alert">비교 상품 없음</div>
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
                    {review && review.total_reviews !== 0 && !review.positive_review_summary.includes("미만이라 요약을 제공할 수 없습니다.") ? (
                        <>
                            <div className='reviewInfo'>
                                <div className={`firstReviewInfoDetail ${firstDetailVisible ? 'visible' : ''}`}>
                                    다음 리뷰 긍정 평가는 Amazon Comprehend의 감정 분석 기능을 이용한 기술 입니다.
                                </div>
                                <IoInformationCircleOutline className='firstReviewInfo' onClick={toggleFirstDetail} />
                            </div>
                            <div className="reviewBar">
                                <div className="positive" style={{ width: `${review.average_positive}%` }}><span className="tooltiptext">{review.average_positive}%</span></div>
                                <div className="neutral" style={{ width: `${review.average_neutral}%` }}><span className="tooltiptext">{review.average_neutral}%</span></div>
                                <div className="negative" style={{ width: `${review.average_negative}%` }}><span className="tooltiptext">{review.average_negative}%</span></div>
                            </div>

                            <div className='reviewInfo'>
                                <div className={`secondReviewInfoDetail ${secondDetailVisible ? 'visible' : ''}`}>
                                    다음 리뷰 요약은 OpenAI를 통해 요약된 내용입니다.
                                </div>
                                <IoInformationCircleOutline className='secondReviewInfo' onClick={toggleSecondDetail} />
                            </div>
                            <div className="reviewSummary">
                                <div className='summaryFirstColumn'>
                                    <img src={positiveImage} alt='positive AI' className='positiveAIImg'></img>
                                    <div className='positiveReviewTitle'>긍정평가 요약</div>
                                </div>
                                <div className='summarySecondColumn'>
                                    <div className='positiveReviewSummary'>{review.positive_review_summary}</div>
                                    <div className='negativeReviewSummary'>{review.negative_review_summary}</div>
                                </div>
                                <div className='summaryThirdColumn'>
                                    <div className='negativeReviewTitle'>부정평가 요약</div>
                                    <img src={negativeImage} alt='negative AI' className='negativeAIImg'></img>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='LiveProducts__product-status-alert'>해당 리뷰는 준비 중 입니다</div>
                    )}
                </div>
                <div className="productDetails">
                    <h4 className='priceCompare'>상품 상세 정보</h4>
                    {product.img_url_details.length > 0 ? (
                        product.img_url_details.map((url, index) => (
                            <img key={index} className='productDetailInfo' src={url} alt={`${id}-${index}`} />
                        ))
                    ) : (<h4 className="LiveProducts__product-status-alert">상세 정보 없음</h4>)
                    }
                </div>
            </div>
        </>
    );
}

export default LiveProduct;
