import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Routing 요소 출력을 위해 Components 임포트
import TVShopping from './TVShopping/TVShopping.js';
import Calendar from './TVShopping/Calendar.js';
import MallsMenu from './TVShopping/MallsMenu.js';
import HotProduct from './TVShopping/HotProduct.js';
import Home from './home/Home.js';
import LiveProduct from './product/LiveProducts.js';
import SearchProduct from './product/SearchProduct.js';
import AWSCloudSchoolCooperators from './common/AWSCloudSchoolCooperators.js';
import WarningMessage from './common/WarningMessage.js';
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
    const [showWarning, setShowWarning] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            document.body.classList.toggle('dark-mode', newMode);
            return newMode;
        });
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [location.pathname]);

    const handleMiddleDateChange = (date) => {
        setSelectedDate(date);
        const today = new Date();
        today.setHours(0,0,0,0);
        console.log("date: ", date);
        console.log("today: ", today);
        if(date < today) {
            console.log("나는 참이다");
            setShowWarning(true);
        }
        else{
            setShowWarning(false);
        }
        
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
  
    const handleWarningClose = () => {
        setShowWarning(false);
    };

    return (
        <div className={`mainContainer ${isDarkMode ? 'dark-mode' : ''}`}>
            <Header showHeader={showHeader} onWithClick={handleWithClick} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} className='headerContainer'/>
            <Routes>
                <Route path="/" element={
                    <div className='mainPage'>
                        <Home isDarkMode={isDarkMode}/>
                    </div>
                } />
                <Route path="/TVShopping" element={
                    <div className='tvShoppingContainer'>
                        <MallsMenu onSelectionChange={handleMenuSelection} />
                        <Calendar onMiddleDateChange={handleMiddleDateChange} className='calendar'/>
                        <HotProduct selectedDate={selectedDate} />
                        <div className='contentContainer'>
                            <TVShopping selectedDate={selectedDate} onScrollToCurrentHour={scrollToCurrentHour} selectedMalls={selectedMalls} isDarkMode={isDarkMode}/>
                        </div>
                    </div>
                } />
                <Route path="/product/:id" element={<LiveProduct isDarkMode={isDarkMode}/>} />
                <Route path="/search" element={
                    <div className='searchContainer'>
                        <SearchProduct isDarkMode={isDarkMode}/>
                    </div>
                } />
                <Route path="*" element={<div className='Main__extra'>
                    <h3>없는 페이지에요 :(</h3>
                    <img src={CryingDocker} alt="docker" />
                </div>} />
            </Routes>
            <AWSCloudSchoolCooperators show={showWith} onClose={handleClose} isDarkMode={isDarkMode}/>
            <WarningMessage show={showWarning} onClose={handleWarningClose} isDarkMode={isDarkMode}/>
        </div>
    );
}

export default Main;