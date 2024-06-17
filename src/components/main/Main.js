import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import TVShopping from './main-tv/TVShopping';
import SpecialOffers from './main-hotdeal/SpecialOffers';
import Calendar from './main-tv/Calendar.js';
import LiveProduct from '../product/LiveProducts.js';
import CryingDocker from '../../assets/images/crying_docker.png';

function Main(){
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState('TV쇼핑');
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const handleMiddleDateChange = (date) => {
        setSelectedDate(date);
    };

    const scrollToCurrentHour = useCallback(() => {
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');
        const currentHourElement = document.getElementById(`hour-${currentHour}`);
        if (currentHourElement) {
            currentHourElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <>
            <SearchBar selectedTab={selectedTab} setSelectedTab={handleTabClick} />
            <Routes>
                <Route path="/" element={
                    selectedTab === 'TV쇼핑' ? (
                        <div>
                            <Calendar onMiddleDateChange={handleMiddleDateChange} />
                            <TVShopping selectedDate={selectedDate} onScrollToCurrentHour={scrollToCurrentHour} />
                        </div>
                    ) : (
                    selectedTab === '특가' && <SpecialOffers />
                    )
                } />
                <Route path="product/:id" element={<LiveProduct />} />
                <Route path="*" element={<>
                        <h3>없는 페이지에요 :(</h3>
                        <img src={CryingDocker} alt="docker"/>
                    </>} />
            </Routes>
        </>
    );
}

export default Main;