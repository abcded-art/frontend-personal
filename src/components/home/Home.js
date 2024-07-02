/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../../assets/styles/Home.css'
import { Link } from 'react-router-dom';
import banner1 from '../../assets/images/banner-01.jpg';
import banner2 from '../../assets/images/banner-02.jpg';
import banner3 from '../../assets/images/banner-03.jpg';

const banners = [banner1, banner2, banner3];

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + banners.length) % banners.length);
    };

    return (
        <div className='Home__homeContainer'>
            <div id="slides-shop" className="Home__cover-slides">
                <ul className="Home__slides-container" style={{ transform: `translateX(${-currentIndex * 100}%)`, transition: 'transform 0.8s ease-in-out' }}>
                    {banners.map((banner, index) => (
                        <li key={index} className={`Home__slide ${index === currentIndex ? 'active' : ''}`}>
                            <img src={banner} alt={`banner${index + 1}`} />
                            <div className="Home__container">
                                <div className="Home__row">
                                    <div className="Home__col-md-12">
                                        <h1 className="Home__m-b-20"><strong>Welcome To <br/> Thewayshop</strong></h1>
                                        <p className="Home__m-b-40">See how your users experience your website in realtime or view <br/> trends to see any changes in performance over time.</p>
                                        <p><a className="Home__btn Home__hvr-hover" href="#">Shop New</a></p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="Home__slides-navigation">
                    <a onClick={prevSlide} className="Home__prev"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
                    <a onClick={nextSlide} className="Home__next"><i className="fa fa-angle-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Home;