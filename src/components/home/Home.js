/* eslint-disable */
import React, { useEffect } from 'react';
import '../../assets/styles/Home.css'
import { Link } from 'react-router-dom';
import { RiArrowDownWideFill } from "react-icons/ri";

// Swiper: core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


// Import images
import banner1 from '../../assets/images/banner-01.jpg';
import banner2 from '../../assets/images/banner-02.jpg';
import banner3 from '../../assets/images/banner-03.jpg';

import mainBackground from '../../assets/images/Home2.png';
import mainBackground_dark from '../../assets/images/Home-dark2.png';
import quickCatchLogo from '../../assets/images/quickcatch_logo.png';
import startBarLignt from '../../assets/images/Home-light-start-bar.png';
import startBarDark from '../../assets/images/Home-dark-start-bar.png';

const banners = [banner1, banner2, banner3];

function Home() {

    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.Home__introBox-Describe-Detail, .Home__appear-slightly');
            const windowHeight = window.innerHeight - 150;
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < windowHeight && rect.bottom >= 0) {
                    el.style.transition = 'opacity 1s';
                    el.style.opacity = 1;
                } else {
                    el.style.transition = 'opacity 1s';
                    el.style.opacity = 0;
                }
            });
        };
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        new Swiper('.swiper-container', {
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }, []);

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className='Home__homeContainer'>
            <div className='Home__background-Image-Wrapper'>
                <div className='Home__quickcatch-logo-wrapper'>
                    <img src={quickCatchLogo} alt='quickCatch_Logo' className='Home__quickcatch-logo' />
                </div>
                <div className='Home__link-to-tvShopping-desc'>
                    <Link to='/TVShopping' className='Home__link-to-tvShopping'>
                        <div className='Home__start-bar-wrapper'>
                            <div className='Home__start-bar'>
                                <img src={startBarLignt} alt='start-bar' className='Home__start-bar-img' />
                            </div>
                            <div className='Home__start-bar-text Home__start-bar'>
                                <p>쇼핑하러 가기</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='Home__more-info-arrow' onClick={scrollToNextSection}>
                    <RiArrowDownWideFill />
                </div>
                <img src={mainBackground} alt='Home__main-background' className='Home__main-background-img' />
            </div>


            <div className='Home__explainBox-wrapper'>

                <div className='Home__introBox'>
                    <h3 className='Home__box-Title Home__introBox-Title Home__appear-slightly'>Quick Catch 방문을<br />환영합니다</h3>
                    <div className='Home__introBox-Describe'>
                        <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>실시간 방송 가격 비교</h4>
                        <div className='Home__introBox-Describe-Detail-image-wrapper Home__appear-slightly'>
                            <div className='swiper-wrapper'>
                                {banners.map((banner, index) => (
                                    <div key={index} className='swiper-slide'>
                                        <div class='Home__swiper-text-wrap'>
                                        </div>
                                        <img src={banner} alt={`Banner ${index + 1}`} className='Home__introBox-Describe-Detail-image' />
                                    </div>
                                ))}
                            </div>
                            {/* <img src={banners[0]} alt='' className='Home__introBox-Describe-Detail-image'/> */}
                        </div>
                        <p className='Home__introBox-Describe-Detail'>실시간 홈쇼핑 방송과</p>
                        <p className='Home__introBox-Describe-Detail'>인터넷 최저가 비교를 통해</p>
                        <p className='Home__introBox-Describe-Detail'>최고의 할인 상품을 한 눈에 확인하세요</p>
                    </div>
                    <div className='Home__introBox-Describe'>
                        <br /><br />
                        <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>리뷰 요약과 할인율 비교</h4>
                        <div className='Home__introBox-Describe-Detail-image-wrapper Home__appear-slightly '>
                            <div className='swiper-wrapper'>
                                {banners.map((banner, index) => (
                                    <div key={index} className='swiper-slide'>
                                        <img src={banner} alt={`Banner ${index + 1}`} className='Home__introBox-Describe-Detail-image' />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className='Home__introBox-Describe-Detail'>리뷰 요약과 할인율 순위로</p>
                        <p className='Home__introBox-Describe-Detail'>쇼핑의 모든 것을</p>
                        <p className='Home__introBox-Describe-Detail'>빠르고 스마트하게 즐기세요</p>

                    </div>
                </div>

                <div className='Home__explain'>
                    <h3 className='Home__box-Title Home__appear-slightly'>
                        Quick Catch 톺아보기
                    </h3>

                </div>

                <div className='Home__vision'>
                    <h3 className='Home__box-Title Home__appear-slightly'>
                        Quick Catch 비전
                    </h3>
                    <div className='Home__vision-box'>
                        <div className='Home__vision-row1'>
                            <div className='Home__vision-homepage-wrapper'>
                                <h4>Homepage Vision</h4>
                                <p>가나다라마바사아자차카타파하</p>
                            </div>
                        </div>
                        <div className='Home__vision-row2'>
                            <div className='Home__vision-team-wrapper'>
                                <h4>Team Vision</h4>
                                <p>가나다라마바사아자차카타파하</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='Home__quickCatchTeam'>
                    <h3 className='Home__box-Title Home__appear-slightly'>
                        Quick Catch 팀
                    </h3>
                    <div className='Home__imageBox'>
                        <img src={banners[0]} alt='test1' className='Home__imageBox-img'></img>
                    </div>
                    <div className='Home__explainBox-describe'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum sodales odio sed ornare. Vivamus urna turpis, placerat ut sodales at, eleifend vulputate dui. Quisque tristique nunc eleifend erat consectetur volutpat. Nam laoreet consectetur ligula volutpat interdum. Fusce ac semper massa, id aliquam quam. Sed non est vel turpis pretium egestas. Aenean ac enim venenatis urna porta dictum eu at tortor. Vivamus eget nisi at nulla dignissim consequat in finibus velit. Pellentesque vitae neque eget augue fringilla gravida sit amet vitae est.
                    </div>
                </div>

                <div className='Home__explainBox'>
                    <div className='Home__imageBox'>
                        <img src={banners[0]} alt='test1' className='Home__imageBox-img'></img>
                    </div>
                    <div className='Home__explainBox-describe'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum sodales odio sed ornare. Vivamus urna turpis, placerat ut sodales at, eleifend vulputate dui. Quisque tristique nunc eleifend erat consectetur volutpat. Nam laoreet consectetur ligula volutpat interdum. Fusce ac semper massa, id aliquam quam. Sed non est vel turpis pretium egestas. Aenean ac enim venenatis urna porta dictum eu at tortor. Vivamus eget nisi at nulla dignissim consequat in finibus velit. Pellentesque vitae neque eget augue fringilla gravida sit amet vitae est.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;