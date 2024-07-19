/* eslint-disable */
import React, { useEffect, useState } from 'react';
import '../../assets/styles/Home.css'
import { Link } from 'react-router-dom';
import { RiArrowDownWideFill } from "react-icons/ri";
import HomeIntro from './HomeIntro';
import classNames from 'classnames';

// Swiper: core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import images
import Home_TVShopping from '../../assets/images/Home_TVShopping.png';
import Home_LiveProduct from '../../assets/images/Home_LiveProduct.png';
import Home_AIReview from '../../assets/images/Home_AIReview2.png';
import Home_SearchProduct from '../../assets/images/Home_SearchProduct.png';

import Home_Pro1 from '../../assets/images/Home_Pro1.png';
import Home_Pro2 from '../../assets/images/Home_Pro2.png';
import Home_Pro3 from '../../assets/images/Home_Pro3.png';
import Home_Pro4 from '../../assets/images/Home_Pro4.png';

import Home_Comp1 from '../../assets/images/Home_Comp1.png';
import Home_Comp2 from '../../assets/images/Home_Comp2.png';

import mainBackground from '../../assets/images/Home2.png';
import mainBackground_dark from '../../assets/images/Home-dark1.png';
import quickCatchLogo from '../../assets/images/quickcatch_logo.png';
import quickCatchLogoDark from '../../assets/images/quickcatch_logo_Dark.png';
import startBarLignt from '../../assets/images/Home-light-start-bar.png';
import startBarDark from '../../assets/images/Home-dark-start-bar.png';

const Home_Products = [Home_Pro1, Home_Pro2, Home_Pro3, Home_Pro4];
const Home_Comparisons = [Home_Comp1, Home_Comp2];

function Home({ isDarkMode }) {
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        const seenIntro = localStorage.getItem('seenIntro');
        if (!seenIntro) {
            setShowIntro(true);
        }
    }, []);

    const handleIntroClose = () => {
        setShowIntro(false);
    };

    const handleNeverShowAgain = () => {
        localStorage.setItem('seenIntro', 'true');
        setShowIntro(false);
    };

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

    const scrollToStartSection = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    };

    useEffect(() => {
        scrollToStartSection();
    }, []);

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className={classNames('Home__homeContainer', { 'dark': isDarkMode })}>
            {showIntro && <HomeIntro show={showIntro} onClose={handleIntroClose} onNeverShowAgain={handleNeverShowAgain} className='Home__homeIntroLinker' />}
            <div className='Home__background-Image-Wrapper'>
                <div className='Home__quickcatch-logo-wrapper'>
                    <img src={isDarkMode ? quickCatchLogoDark : quickCatchLogo} alt='quickCatch_Logo' className='Home__quickcatch-logo' />
                </div>
                <div className='Home__link-to-tvShopping-desc'>
                    <Link to='/TVShopping' className={classNames('Home__link-to-tvShopping', { 'dark': isDarkMode})}>
                        <div className='Home__start-bar'>
                            <img src={isDarkMode ? startBarDark : startBarLignt} alt='start-bar' className='Home__start-bar-img' />
                            <div className='Home__start-bar-text'>
                                쇼핑하러 가기
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='Home__more-info-arrow' onClick={scrollToNextSection}>
                    <RiArrowDownWideFill />
                </div>
                <img src={isDarkMode ? mainBackground_dark : mainBackground} alt='Home__main-background' className='Home__main-background-img' />
            </div>


            <div className='Home__contents'>
                <h3 className='Home__box-Title Home__introBox-Title Home__appear-slightly'>QuickCatch 활용 방법</h3>
                <div className='Home__introBox'>
                    <div className='Home__introBox-Describe'>

                        <div className='Home__introBox-Describe-Content'>
                            <div className='Home__introBox_Describe-ImageWrapper '>
                                <img src={Home_TVShopping} alt='Shopping page usage' className='Home__introBox-Describe-Detail-image Home__appear-slightly' />
                            </div>
                            <div>
                                <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>메인 페이지</h4>
                                <ol className='Home__appear-slightly'>
                                    <li>검색창을 통해 원하는 상품 정보를 검색할 수 있습니다.</li>
                                    <li>오늘 날짜 뿐만 아니라 다른 날짜의 방송 상품 리스트도 확인할 수 있습니다.</li>
                                    <li>현재 라이브 방송 중이면, 이미지 상단에 'Live'가 표시됩니다.</li>
                                    <li>원하는 홈쇼핑사를 선택하여 조회할 수 있습니다.</li>
                                    <li>해당 날짜의 방송 상품 중, 인터넷 최저가보다 저렴한 폭이 큰 상위 상품들을 보여줍니다.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className='Home__introBox-Describe'>
                        <div className='Home__introBox-Describe-Content'>
                            <div>
                                <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>상품 상세 페이지</h4>
                                <ol className='Home__appear-slightly'>
                                    <li>해당 상품에 대한 상세 정보 및 구매 링크를 제공합니다.</li>
                                    <li>해당 상품의 인터넷 가격을 최저가 순으로 보여줍니다.</li>
                                </ol>
                            </div>

                            <div className='Home__introBox_Describe-ImageWrapper '>
                                <img src={Home_LiveProduct} alt='Shopping page usage' className='Home__appear-slightly' />
                            </div>

                        </div>

                    </div>
                    <div className='Home__introBox-Describe'>

                        <div className='Home__introBox-Describe-Content'>
                            <div className='Home__introBox_Describe-ImageWrapper '>
                                <img src={Home_AIReview} alt='Shopping page usage' className='Home__appear-slightly' />
                            </div>
                            <div>
                                <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>상품 리뷰 페이지</h4>
                                <ol className='Home__appear-slightly'>
                                    <li>Amazon Comprehend를 활용하여 기존 리뷰들을 긍정/부정 비율로 수치화하여 분석하고, 시각화한 결과를 보여줍니다.</li>
                                    <li>OPEN AI를 활용하여 긍정/부정 리뷰로 요약하여 제공합니다.</li>
                                </ol>
                            </div>

                        </div>


                    </div>
                    <div className='Home__introBox-Describe'>

                        <div className='Home__introBox-Describe-Content'>
                            <div>
                                <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>상품 검색 페이지</h4>
                                <ol className='Home__appear-slightly'>
                                    <li>검색창에 단어 입력 시, Elasticsearch의 형태소 분석을 통한 유사 상품이 출력됩니다.</li>
                                    <li>검색 결과에는 Elasticsearch에서 가져온 유사 상품 정보가 제공됩니다.</li>
                                </ol>
                            </div>

                            <div className='Home__introBox_Describe-ImageWrapper '>
                                <img src={Home_SearchProduct} alt='Shopping page usage' className='Home__appear-slightly' />
                            </div>

                        </div>


                    </div>
                    {/* <div className='Home__introBox-Describe'>
                        <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>실시간 방송 가격 비교</h4>
                        <div className='Home__introBox-Describe-Detail-image-wrapper Home__appear-slightly'>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={true}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className='Home__swiper'
                            >
                                {Home_Products.map((banner, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='Home__swiper-text-wrap'>
                                            <img src={banner} alt={`Banner ${index + 1}`} className='Home__introBox-Describe-Detail-image' />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <p className='Home__introBox-Describe-Detail'>실시간 홈쇼핑 방송과</p>
                        <p className='Home__introBox-Describe-Detail'>인터넷 최저가 비교를 통해</p>
                        <p className='Home__introBox-Describe-Detail'>최고의 할인 상품을 한 눈에 확인하세요</p>
                    </div>
                    <div className='Home__introBox-Describe'>
                        <br /><br />
                        <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>리뷰 요약과 할인율 비교</h4>
                        <div className='Home__introBox-Describe-Detail-image-wrapper Home__appear-slightly'>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={50}
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className='Home__swiper'
                            >
                                {Home_Comparisons.map((banner, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='Home__swiper-text-wrap'>
                                            <img src={banner} alt={`Banner ${index + 1}`} className='Home__introBox-Describe-Detail-image' />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <p className='Home__introBox-Describe-Detail'>리뷰 요약과 할인율 순위로</p>
                        <p className='Home__introBox-Describe-Detail'>쇼핑의 모든 것을</p>
                        <p className='Home__introBox-Describe-Detail'>빠르고 스마트하게 즐기세요</p>

                    </div> */}
                </div>

                <div className='Home__vision'>
                    <h3 className='Home__box-Title Home__appear-slightly'>
                        Quick Catch 비전
                    </h3>
                    <div className='Home__vision-box Home__appear-slightly'>
                        <div className={classNames(`Home__vision-explain-box`, { 'dark': isDarkMode })}>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>원하는 상품을</h4>
                                <p className='Home__vision-homepage-describe-detail'>원하는 상품명 및 홈쇼핑사로 상품을 조회 할 수 있습니다.</p>
                            </div>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>빠르게</h4>
                                <p className='Home__vision-homepage-describe-detail'>해당 상품의 온라인 가격 비교와 리뷰 요약을 제공하여, 사용자의 검색 시간을 단축시켜 줍니다.</p>
                            </div>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>저렴하게</h4>
                                <p className='Home__vision-homepage-describe-detail'>인터넷 최저가보다 저렴한 상위 상품 정보를 제공합니다.</p>
                            </div>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>비교</h4>
                                <p className='Home__vision-homepage-describe-detail'>홈쇼핑 상품을 온라인 최저가와 비교하여, 합리적인 선택을 도와줍니다.</p>
                            </div>
                        </div>
                        <div className={classNames('Home__vision-image-box', { 'dark': isDarkMode })}>
                            <div className='Home__vision-image-wrapper'>
                                <img src={Home_Comparisons[1]} alt='' className='Home__vision-image' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='Home__quickCatchTeam'>
                    <h3 className='Home__box-Title Home__appear-slightly'>
                        Quick Catch 팀
                    </h3>
                    <div className='Home__team-box Home__appear-slightly'>
                        <div className='Home__team-classMate'>
                            <div className='Home__team-classMate-name'>이민호<span className='Home__team-classMate-specific'>(팀장)</span></div>
                            <ol className={classNames('Home__team-classMate-detail', { 'dark': isDarkMode })}>
                                <li>PL(project leader_ 아키텍처 설계)</li>
                                <li>Architect</li>
                                <li>EFK Observability</li>
                                <li>Insight 도출</li>
                            </ol>
                        </div>
                        <div className='Home__team-classMate'>
                            <div className='Home__team-classMate-name'>유성우<span className='Home__team-classMate-specific'>(부팀장)</span></div>
                            <ol className={classNames('Home__team-classMate-detail', { 'dark': isDarkMode })}>
                                <li>PE (project engineer_ 실제 구현) </li>
                                <li>DB 총괄</li>
                                <li>Crawler Cronjob</li>
                                <li>Frontend-검색</li>
                                <li>Cloud Migration</li>
                                <li>DB Backup Strategy</li>
                                <li>시연영상 편집</li>
                            </ol>
                        </div>
                        <div className='Home__team-classMate'>
                            <div className='Home__team-classMate-name'>이길화</div>
                            <ol className={classNames('Home__team-classMate-detail', { 'dark': isDarkMode })}>
                                <li>PM (project manager_ 아키텍처 설계) </li>
                                <li>Backend 총괄 </li>
                                <li>Crawler 전처리 </li>
                                <li>GitLab 구축</li>
                                <li>GitLab Runner (CI)</li>
                                <li>ArgoCD (CD)</li>
                                <li>아키텍처 시각화</li>

                            </ol>
                        </div>
                        <div className='Home__team-classMate'>
                            <div className='Home__team-classMate-name'>한규민</div>
                            <ol className={classNames('Home__team-classMate-detail', { 'dark': isDarkMode })}>
                                <li>PE (project engineer_ 실제 구현)</li>
                                <li>Frontend 총괄 </li>
                                <li>UI / UX </li>
                                <li>GitLab Runner (CI) </li>
                                <li>App 이미지화</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* <div className='Home__explainBox'>
                    <div className='Home__imageBox'>
                        <img src={Home_Comparisons[0]} alt='test1' className='Home__imageBox-img'></img>
                    </div>
                    <div className='Home__explainBox-describe'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum sodales odio sed ornare. Vivamus urna turpis, placerat ut sodales at, eleifend vulputate dui. Quisque tristique nunc eleifend erat consectetur volutpat. Nam laoreet consectetur ligula volutpat interdum. Fusce ac semper massa, id aliquam quam. Sed non est vel turpis pretium egestas. Aenean ac enim venenatis urna porta dictum eu at tortor. Vivamus eget nisi at nulla dignissim consequat in finibus velit. Pellentesque vitae neque eget augue fringilla gravida sit amet vitae est.
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Home;