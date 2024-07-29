import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/SearchProduct.css';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { config } from "../../config.js"

const { frontendAddr } = config;

const useQuery = () => new URLSearchParams(useLocation().search);

function SearchProduct({ isDarkMode }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = useQuery();
    const searchQuery = query.get("q");

    useEffect(() => {
        if (!searchQuery) return;
        console.log(searchQuery);
        const fetchSearchProduct = async () => {
            setLoading(true);

            try {
                const response = await axios({
                    method: 'post',
                    url: `${frontendAddr}/api/search`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        query: searchQuery,
                    },
                });
                console.log("This is a result of axios method");
                console.log("Elasticsearch Response: ", response.data);
                setData(response.data.hits.hits);  // 데이터 매핑
            } catch (error) {
                console.error("Failed to fetch data from Elasticsearch", error);
                setError(error);
            } finally {
                setLoading(false);  // 로딩 상태를 false로 설정
            }
        };

        fetchSearchProduct();
    }, [searchQuery]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else{
            document.body.classList.remove('dark-mode');
        }
    });

    if (loading) {
        return <div>로딩중 입니다.</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatPrice = (price) => {
        if (!price) return '가격문의';
        const priceNumber = Number(price);
        if (isNaN(priceNumber)) return '가격문의';
        return `${priceNumber.toLocaleString()} 원`;
    }

    const formatBroadcastDate = (date) => {
        return dayjs(date).locale('ko').format('YYYY년 MM월 DD일');
    }

    const getDaysSinceBroadcast = (date) => {
        const days = dayjs().diff(dayjs(date), 'day');
        return days < 0 ? `${Math.abs(days)}일 뒤 방송 예정` : `${days}일 경과`;
    }
    return (
        <div className={`SearchProduct__searchMain ${isDarkMode ? 'dark-mode' : ''}`}>
            {data && data.length > 0 ? (
                <div className='SearchProduct__product-box'>
                    <div className='SearchProduct__product-title-wrapper'>
                        <div className='SearchProduct__product-title'><span className='SearchProduct__searchQuery'>"{searchQuery}"</span>&nbsp;&nbsp;검색 결과</div>
                    </div>
                    <div className='SearchProduct__product-content-box'>
                        <ul className='SearchProduct__product-list'>
                            {data.map((item, index) => {
                                const { _source } = item;
                                const { broadcast_date, price, name, product_id } = _source;
                                const productUrl = `${frontendAddr}/product/${product_id}`;
                                const product_img = _source.image_url;
                                const broadcastStatus = getDaysSinceBroadcast(broadcast_date);
                                const isBroadcasted = broadcastStatus.includes('경과');

                                return (
                                    <li key={index} className='SearchProduct__product-item'>
                                        <Link to={productUrl} target="_blank" className='SearchProduct__product-link'>
                                            <div className='SearchProduct__product-image-wrapper'>
                                                <img src={product_img} alt={name} className='SearchProduct__product-image' />
                                            </div>
                                            
                                            <div className='SearchProduct__product-info-box'>
                                                <div className='SearchProduct__product-info'>
                                                    <div className='SearchProduct__product-name'>{name}</div>
                                                    <div className='SearchProduct__product-price'>{formatPrice(price)}</div>
                                                </div>
                                                
                                                {isBroadcasted ? (
                                                    <div className='SearchProduct__product-date'>
                                                    본 상품은 {formatBroadcastDate(broadcast_date)}(<span className='SearchProduct__product-delayed'>{broadcastStatus}</span>)에 방송되었습니다.
                                                </div>
                                                ) : (  
                                                    <div className='SearchProduct__product-date'>
                                                    본 상품은 {formatBroadcastDate(broadcast_date)} 방송입니다. <span className='SearchProduct__product-delayed'>{broadcastStatus}</span>입니다.
                                                </div>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className='SearchProduct__product-title-wrapper'>
                    <div className='SearchProduct__product-title'><span className='SearchProduct__searchQuery'>"{searchQuery}"</span>&nbsp;&nbsp;에 대한 결과가 없습니다.</div>
                </div>
            )}
        </div>
    );
}

export default SearchProduct;
