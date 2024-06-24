import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import TVShopping from './main-tv/TVShopping';
import Calendar from './main-tv/Calendar.js';
import LiveProduct from '../product/LiveProducts.js';
import CryingDocker from '../../assets/images/crying_docker.png';

function Main(){
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

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
            <Routes>
                <Route path="/" element={
                    <div>
                        <Calendar onMiddleDateChange={handleMiddleDateChange} />
                        <TVShopping selectedDate={selectedDate} onScrollToCurrentHour={scrollToCurrentHour} />
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