import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

// Routing 요소 출력을 위해 Components 임포트
import TVShopping from './TVShopping/TVShopping.js';
import Calendar from './TVShopping/Calendar.js';
import MallsMenu from './TVShopping/MallsMenu.js';
import HotProduct from './TVShopping/HotProduct.js';
import Home from './home/Home.js';
import HomeIntro from './home/HomeIntro.js';
import LiveProduct from './product/LiveProducts.js';
import SearchProduct from './product/SearchProduct.js';
import AWSCloudSchoolCooperators from './common/AWSCloudSchoolCooperators.js';
import Header from './common/Header.js';

// 이미지 임포트
import CryingDocker from '../assets/images/crying_docker.png';

// CSS 임포트
import '../assets/styles/Main.css';

function Main() {
    // const navigate = useNavigate();
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMalls, setSelectedMalls] = useState(["cjonstyle", "gsshop", "hmall", "lotteimall"]);
    const [showHeader, setShowHeader] = useState(false);
    const [showWith, setShowWith] = useState(false);

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
            const isHomePage = location.pathname === '/';
            const isTopOfPage = scrollPosition <= 250;
            setShowHeader(!isHomePage || !isTopOfPage);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);
    
    const handleWithClick = () => {
      setShowWith(true);
    };
  
    const handleClose = () => {
      setShowWith(false);
    };

    return (
        <div className='mainContainer'>
            <Header showHeader={showHeader} onWithClick={handleWithClick} className='headerContainer'/>
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
                <Route path="*" element={<div className='Main__extra'>
                    <h3>없는 페이지에요 :(</h3>
                    <img src={CryingDocker} alt="docker" />
                </div>} />
            </Routes>
            <AWSCloudSchoolCooperators show={showWith} onClose={handleClose} />
        </div>
    );
}

export default Main;