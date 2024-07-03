import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

import TVShopping from './TVShopping/TVShopping.js';
import Calendar from './TVShopping/Calendar.js';
import MallsMenu from './TVShopping/MallsMenu.js';
import HotProduct from './TVShopping/HotProduct.js';
import Home from './home/Home.js';
import LiveProduct from './product/LiveProducts.js';
import SearchProduct from './product/SearchProduct.js';

import CryingDocker from '../assets/images/crying_docker.png';
import '../assets/styles/Main.css';

import Header from './common/Header.js';

function Main() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMalls, setSelectedMalls] = useState(["cjonstyle", "gsshop", "hmall", "lotteimall"]);
    const [showHeader, setShowHeader] = useState(false);

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

    const handleMenuSelection = (newSelection) => {
        setSelectedMalls(newSelection);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100){
                setShowHeader(true);
            } else{
                setShowHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className='mainContainer'>
            <Header showHeader={showHeader} />
            <Routes>
                <Route path="/" element={
                    <div className='mainPage'>
                        <Home />
                    </div>
                } />
                <Route path="/TVShopping" element={
                    <div className='tvShoppingContainer'>
                        <MallsMenu onSelectionChange={handleMenuSelection} />
                        <Calendar onMiddleDateChange={handleMiddleDateChange} className='calendar'/>
                        <HotProduct selectedDate={selectedDate} />
                        <div className='contentContainer'>
                            <TVShopping selectedDate={selectedDate} onScrollToCurrentHour={scrollToCurrentHour} selectedMalls={selectedMalls} />
                        </div>
                    </div>

                } />
                <Route path="/product/:id" element={<LiveProduct />} />
                <Route path="/search" element={
                    <div className='searchContainer'>
                        <SearchProduct />
                    </div>
                } />
                <Route path="*" element={<>
                    <h3>없는 페이지에요 :(</h3>
                    <img src={CryingDocker} alt="docker" />
                </>} />
            </Routes>
        </div>
    );
}

export default Main;