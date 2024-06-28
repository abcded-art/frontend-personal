import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/SearchProduct.css';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 날짜 포맷팅을 위해 추가

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

function SearchProduct() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = useQuery();
    const searchQuery = query.get("q");

    useEffect(() => {
        if (!searchQuery) return;
        console.log(searchQuery);
        const fetchSearchProduct = async () => {
            setLoading(true);  // 로딩 상태를 true로 설정
        
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://192.168.0.11:5000/api/search',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        query: searchQuery,
                    },
                });
        
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

    if (loading) {
        return <div>Loading...</div>;
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
        <div className='searchMain'>
            <h1>검색 결과</h1>
            {data && data.length > 0 ? (
                <ul className='product-list'>
                    {data.map((item, index) => {
                        const { _source } = item;
                        const { broadcast_date, detail_images, price, name, product_id } = _source;
                        const productUrl = `http://192.168.0.11:3000/product/${product_id}`;
                        return (
                            <li key={index} className='product-item'>
                                <a href={productUrl} target="_blank" rel="noopener noreferrer" className='product-link'>
                                    <img src={detail_images[0]} alt={name} className='product-image' />
                                    <div className='product-info'>
                                        <h2>{name}</h2>
                                        <p>가격: {formatPrice(price)}</p>
                                        <p>방송 날짜: {formatBroadcastDate(broadcast_date)}</p>
                                        <p>경과 일수: {getDaysSinceBroadcast(broadcast_date)}</p>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default SearchProduct;
