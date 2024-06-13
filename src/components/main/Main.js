import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import TVShopping from './main-tv/TVShopping';
import SpecialOffers from './main-hotdeal/SpecialOffers';
import Calendar from './main-tv/Calendar.js';
import LiveProduct from '../product/live-product.js';
import CryingDocker from '../../assets/images/crying_docker.png';

function Main(){
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState('TV쇼핑');

    useEffect(() => {
        if (location.pathname.includes('특가')) {
            setSelectedTab('특가');
        } else if (location.pathname.includes('TV쇼핑')) {
            setSelectedTab('TV쇼핑');
        }
    }, [location.pathname]);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        navigate('/');
    };

    return (
        <>
            <SearchBar selectedTab={selectedTab} setSelectedTab={handleTabClick} />
            <Routes>
                <Route path="/" element={
                    selectedTab === 'TV쇼핑' ? (
                        <div>
                            <Calendar />
                            <TVShopping />
                        </div>
                    ) : (
                    selectedTab === '특가' && <SpecialOffers />
                    )
                } />
                <Route path="product/:id" element={<LiveProduct />} />
                <Route path="*" element={<>
                        <h3>페이지가 없어요 ㅠㅠ</h3>
                        <img src={CryingDocker} alt="docker"/>
                    </>} />
            </Routes>
        </>
    );
}

export default Main;