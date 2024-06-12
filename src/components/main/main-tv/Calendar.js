import react, { useState, useEffect } from 'react';
import '../../../assets/styles/Calendar.css';

function Calendar() {
    const today = new Date();
    today.setDate(today.getDate() - 3);
    const [currentStartDate, setCurrentStartDate] = useState(new Date(today));
    const [currentMonthElements, setCurrentMonthElements] = useState([]);
    const [dateElements, setDateElements] = useState([]);

    const updateDates = (startDate) => {
        if (!(startDate instanceof Date)){
            startDate = new Date(startDate);
        }

        const dateElements = [];
        const monthElements = [];
        const todayString = new Date().toDateString();
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const day = date.getDate();
            const month = monthNames[date.getMonth()];
            const dateString = date.toDateString();
            const isToday = dateString === todayString;
            const isMiddle = i === 3;

            if( i === 0 || date.getDate() === 1){
                monthElements.push(<div key={`month-${i}`} className="month-label">{month}</div>);
            }
            else{
                monthElements.push(<div key={`month-${i}`} className="month-label" ></div>);
            }
            dateElements.push(
                <div
                    key={i}
                    className={`date-link ${isToday ? 'today' : ''} ${isMiddle ? 'middle' : ''}`}
                    onClick={() => setCurrentStartDate(new Date(date.setDate(date.getDate() - 3)))}
                >
                    {day}일
                </div>
            );
        }
        setCurrentMonthElements(monthElements);
        setDateElements(dateElements);
    };

    useEffect(()=>{
        updateDates(currentStartDate);
    }, [currentStartDate]);

    const handlePrevClick = (e) => {
        e.preventDefault();
        setCurrentStartDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 3);
            return newDate;
        });
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        setCurrentStartDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 3);
            return newDate;
        });
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="calendar-months">{ currentMonthElements }</div>
                <div className="calendar-dates">
                    <a href="#" onClick={handlePrevClick}>&lt;</a>
                    <div className="dates">{ dateElements }</div>
                    <a href="#" onClick={handleNextClick}>&gt;</a>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    );
}

export default Calendar;