import { useState, useEffect } from 'react';
import '../../assets/styles/Calendar.css';

function Calendar({ onMiddleDateChange }) {
    const today = new Date();
    today.setDate(today.getDate() - 3);
    const [currentStartDate, setCurrentStartDate] = useState(new Date(2024, 5, 29, 23, 5));
    const [dateElements, setDateElements] = useState([]);

    const updateDates = (startDate) => {
        if (!(startDate instanceof Date)){
            startDate = new Date(startDate);
        }

        const dateElements = [];
        const todayString = new Date().toDateString();
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const day = date.getDate();
            const dateString = date.toDateString();
            const isToday = dateString === todayString;
            const isMiddle = i === 3;
            const dayOfWeek = daysOfWeek[date.getDay()];

            if (isMiddle) {
                onMiddleDateChange(date);
            }

            dateElements.push(
                <div
                    key={i}
                    className={`date-link ${isToday ? 'today' : ''} ${isMiddle ? 'middle' : ''}`}
                    onClick={() => setCurrentStartDate(new Date(date.setDate(date.getDate() - 3)))}
                >
                    <div className="date-number">{day}</div>
                    <div className="date-day">{isToday ? '오늘' : dayOfWeek}</div>
                </div>
            );
        }
        setDateElements(dateElements);
    };

    useEffect(()=>{
        updateDates(currentStartDate);
    }, [currentStartDate]);

    const handlePrevClick = (e) => {
        e.preventDefault();
        setCurrentStartDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 1);
            return newDate;
        });
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        setCurrentStartDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 1);
            return newDate;
        });
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="calendar-dates">
                    <div onClick={handlePrevClick} className="handleClick prev">&lt;</div>
                    <div className="dates">
                        { dateElements }
                    </div>
                    <div onClick={handleNextClick} className="handleClick next">&gt;</div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
