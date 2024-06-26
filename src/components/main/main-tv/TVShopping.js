import React, { useState, useEffect } from 'react';
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

const mallNames = ["cjonstyle", "gsshop", "hmall", "lotteimall"];

function TVShopping({ selectedDate, onScrollToCurrentHour, selectedMalls }) {
    const [liveData, setLiveData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];
    const dateStr = selectedDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).split('T')[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://192.168.0.10:8000/api/live/mainlist?date=${dateStr}&site_name=cjonstyle,gsshop,hmall,lotteimall`; // 필요에 따라 site_name을 동적으로 조정
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
                    {(liveData[hour] || []).map((product, index) => {
                        const liveStartTime = new Date(`${dateStr}T${product.start_time}:00`);
                        const isBeforeLive = now < liveStartTime;
                        return (
                            <div key={index} className="product">
                                {isBeforeLive && (
                                    <div className='divForAlertAlign'>
                                        <div className='alert' onClick={() => setShowAlert(true)}>
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
                                            <img
                                                src={mallImages[product.site_name]}
                                                alt={product.site_name}
                                                className='checkboxMallLogo'
                                            />
                                            <p className='productPrice'>{product.p_price ? product.p_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` 원` : `상담문의`}</p>
                                        </div>
                                    </div>
                                    <div className='productSecondRow'>

                                    </div>

                                </div>
                            </div>
                        );
                    })}
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
            <SetAlert show={showAlert} onClose={() => setShowAlert(false)} />
        </div>
    );
}

export default TVShopping;
