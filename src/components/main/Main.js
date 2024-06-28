import React, { useState, useCallback } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import TVShopping from './main-tv/TVShopping';
import Calendar from './main-tv/Calendar.js';
import LiveProduct from '../product/LiveProducts.js';
import MallsMenu from './main-tv/MallsMenu.js';
import HotProduct from './main-tv/HotProduct.js';
import CryingDocker from '../../assets/images/crying_docker.png';
import '../../assets/styles/Main.css';

function Main(){
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMalls, setSelectedMalls] = useState(["cjonstyle", "gsshop", "hmall", "lotteimall"]);

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

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <div className='mainContainer'>
                        <MallsMenu onSelectionChange={handleMenuSelection} />
                        <Calendar onMiddleDateChange={handleMiddleDateChange} />
                        <HotProduct selectedDate={selectedDate} />
                        <div className='contentContainer'>
                            <TVShopping selectedDate={selectedDate} onScrollToCurrentHour={scrollToCurrentHour} selectedMalls={selectedMalls}/>
                        </div>
                    </div>

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