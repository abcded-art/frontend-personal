import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/TVShopping.css';
import cjonstyleRes from '../../../sampleDatas/cjonstyle.json';
import gsshopRes from '../../../sampleDatas/gsshop.json';
import hmallRes from '../../../sampleDatas/hmall.json';
import lotteimallRes from '../../../sampleDatas/lotteimall.json';

const mallNames = ["cjonstyle", "gsshop", "hmall", "lotteimall"];
const allData = {
    cjonstyle: cjonstyleRes.result.products,
    gsshop: gsshopRes.result.products,
    hmall: hmallRes.result.products,
    lotteimall: lotteimallRes.result.products
};

function TVShopping({ selectedDate, onScrollToCurrentHour, selectedMalls }) {
    const [liveData, setLiveData] = useState({});
    const [loading, setLoading] = useState(true);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];
    const dateStr = selectedDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredData = selectedMalls.reduce((acc, mall) => {
                    return acc.concat(allData[mall]);
                }, []);

                const groupByHour = (productList) => {
                    const grouped = {};
                    productList.forEach(product => {
                        const hour = product.live_start_time.split(':')[0];
                        if (!grouped[hour]) grouped[hour] = [];
                        grouped[hour].push(product);
                    });
                    return grouped;
                };

                const groupedData = groupByHour(filteredData);
                setLiveData(groupedData);
                setLoading(false);

                if (dateStr === today) {
                    onScrollToCurrentHour();
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedDate, onScrollToCurrentHour, selectedMalls]);

    const renderTimeBar = () => {
        const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');

        return hours.map(hour => (
            <div key={hour} className={`hourGroup ${hour === currentHour ? 'currentHour' : ''}`} id={`hour-${hour}`}>
                <div className='hourLabel'>{`${hour}:00`}</div>
                <div className='hourContent'>
                    {(liveData[hour] || []).map((product, index) => (
                        <div key={index} className="product">
                            <div className='productImageAlign'>
                                <Link to={`/product/${product.p_id}`} className='customLink'>
                                        <div className='productImageFix'>
                                            <img src={product.img_url} alt={product.p_name} />
                                            {dateStr === today && product.now_live_yn === "Y" && (
                                                <div className='liveSign'>Live</div>
                                            )}
                                        </div>
                                </Link>
                            </div>
                            <div className='productInfoBox'>
                                <p className='productName'>{product.p_name}</p>
                                <p className='productPrice'>{product.p_price ? product.p_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `상담문의`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    if (loading) {
        return <div>Loading....</div>;
    }

    return (
        <div className='Main'>
            <div className='mallsContainer'>
                {renderTimeBar()}
            </div>
        </div>
    );
}

export default TVShopping;