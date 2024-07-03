/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../../assets/styles/Home.css'
import { Link } from 'react-router-dom';

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images
import banner1 from '../../assets/images/banner-01.jpg';
import banner2 from '../../assets/images/banner-02.jpg';
import banner3 from '../../assets/images/banner-03.jpg';

import mainBackground from '../../assets/images/Home2.png';
import quickCatchLogo from '../../assets/images/quickcatch_logo.png';

const banners = [banner1, banner2, banner3];

function Home() {

    return (
        <div className='Home__homeContainer'>
            <div className='Home__background-Image-Wrapper'>
                <div className='Home__quickcatch-logo-wrapper'>
                    <img src={quickCatchLogo} alt='quickCatch_Logo' className='Home__quickcatch-logo'/>
                </div>
                <img src={mainBackground} alt='Home__main-background' className='Home__main-background-img'/>
                
            </div>
        </div>
    );
}

export default Home;