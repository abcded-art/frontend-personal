/* eslint-disable */
import React, { useEffect, useState } from 'react';
import '../../assets/styles/Home.css'
import { Link } from 'react-router-dom';
import { RiArrowDownWideFill } from "react-icons/ri";
import HomeIntro from './HomeIntro';

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
import Home_AIReview from '../../assets/images/Home_AIReview.png';
import Home_SearchProduct from '../../assets/images/Home_SearchProduct.png';

import Home_Pro1 from '../../assets/images/Home_Pro1.png';
import Home_Pro2 from '../../assets/images/Home_Pro2.png';
import Home_Pro3 from '../../assets/images/Home_Pro3.png';
import Home_Pro4 from '../../assets/images/Home_Pro4.png';

import Home_Comp1 from '../../assets/images/Home_Comp1.png';
import Home_Comp2 from '../../assets/images/Home_Comp2.png';

import mainBackground from '../../assets/images/Home2.png';
import mainBackground_dark from '../../assets/images/Home-dark2.png';
import quickCatchLogo from '../../assets/images/quickcatch_logo.png';
import startBarLignt from '../../assets/images/Home-light-start-bar.png';
import startBarDark from '../../assets/images/Home-dark-start-bar.png';

const Home_Products = [Home_Pro1, Home_Pro2, Home_Pro3, Home_Pro4];
const Home_Comparisons = [Home_Comp1, Home_Comp2];

function Home() {
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
        <div className='Home__homeContainer'>
            {showIntro && <HomeIntro show={showIntro} onClose={handleIntroClose} onNeverShowAgain={handleNeverShowAgain} className='Home__homeIntroLinker' />}
            <div className='Home__background-Image-Wrapper'>
                <div className='Home__quickcatch-logo-wrapper'>
                    <img src={quickCatchLogo} alt='quickCatch_Logo' className='Home__quickcatch-logo' />
                </div>
                <div className='Home__link-to-tvShopping-desc'>
                    <Link to='/TVShopping' className='Home__link-to-tvShopping'>
                        <div className='Home__start-bar'>
                            <img src={startBarLignt} alt='start-bar' className='Home__start-bar-img' />
                            <div className='Home__start-bar-text'>
                                쇼핑하러 가기
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='Home__more-info-arrow' onClick={scrollToNextSection}>
                    <RiArrowDownWideFill />
                </div>
                <img src={mainBackground_dark} alt='Home__main-background' className='Home__main-background-img' />
            </div>


            <div className='Home__contents'>
                <h3 className='Home__box-Title Home__introBox-Title Home__appear-slightly'>Quick Catch 활용 방법</h3>
                <div className='Home__introBox'>
                    <div className='Home__introBox-Describe'>

                        <div className='Home__introBox-Describe-Content'>
                            <div className='Home__introBox_Describe-ImageWrapper '>
                                <img src={Home_TVShopping} alt='Shopping page usage' className='Home__introBox-Describe-Detail-image Home__appear-slightly' />
                            </div>
                            <div>
                                <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>라이브 쇼핑 페이지</h4>
                                <ol className='Home__appear-slightly'>
                                    <li>검색창을 통해 원하는 상품을 검색할 수 있습니다.</li>
                                    <li>오늘 방송 뿐만이 아니라 다른 날짜의 방송도 확인할 수 있습니다.</li>
                                    <li>방송 상품을 확인할 수 있습니다<br />현재 라이브 방송 중이면 Live 표시가 보입니다.</li>
                                    <li>원하는 홈쇼핑사를 선택하여 확인할 수 있습니다.</li>
                                    <li>선택한 날짜 상품 중 방송 상품과 최저가 상품의 차이가 큰 제품을 확인할 수 있습니다.</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                    <div className='Home__introBox-Describe'>

                        <div className='Home__introBox-Describe-Content'>
                            <div>
                                <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>상품 상세 페이지</h4>
                                <ol className='Home__appear-slightly'>
                                    <li>방송 상품에 대한 상세 정보와 링크를 확인할 수 있습니다.</li>
                                    <li>방송 상품과 유사 상품을 저가 순서대로 확인할 수 있습니다.</li>
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
                                    <li>긍정 비율과 부정 비율을 시각화하여 확인할 수 있습니다.</li>
                                    <li>Amazon Comprehend와 OpenAI로 요약된 인공지능 긍정 리뷰를 확인할 수 있습니다.</li>
                                    <li>Amazon Comprehend와 OpenAI로 요약된 인공지능 부정 리뷰를 확인할 수 있습니다.</li>
                                </ol>
                            </div>

                        </div>


                    </div>
                    <div className='Home__introBox-Describe'>

                        <div className='Home__introBox-Describe-Content'>
                            <div>
                                <h4 className='Home__introBox-Describe-Subtitle Home__subtitle-explainBox Home__appear-slightly'>상품 검색 페이지</h4>
                                <ol className='Home__appear-slightly'>
                                    <li>검색창에 검색 시 관련 상품 목록을 확인할 수 있습니다.</li>
                                    <li>검색 결과에는 검색 상품을 확인할 수 있습니다.</li>
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
                        <div className='Home__vision-explain-box'>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>원하는 상품을</h4>
                                <p className='Home__vision-homepage-describe-detail'>사용자가 원하는 제품을 찾거나, 홈쇼핑사의 제품을 찾습니다.</p>
                            </div>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>빠르게</h4>
                                <p className='Home__vision-homepage-describe-detail'>원하는 제품을 찾았을 때, 비교 상품을 빠르게 확인할 수 있습니다.</p>
                            </div>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>저렴하게</h4>
                                <p className='Home__vision-homepage-describe-detail'>비교 상품을 저렴한 가격부터 보여줍니다.</p>
                            </div>
                            <div className='Home__vision-homepage-describe'>
                                <h4 className='Home__vision-homepage-describe-title'>비교</h4>
                                <p className='Home__vision-homepage-describe-detail'>홈쇼핑 제품과 비교 상품 중 어떤 상품이 더 합리적인 가격인지 비교할 수 있습니다.</p>
                            </div>
                        </div>
                        <div className='Home__vision-image-box'>
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
                            <ol className='Home__team-classMate-detail'>
                                <li>PL(project leader_ 아키텍처 설계)</li>
                                <li>Architect</li>
                                <li>EFK Observability</li>
                                <li>기능 개발</li>
                                <li>- 검색 </li>
                                <li>- 리뷰 요약 </li>
                                <li>- Crawler</li>
                            </ol>
                        </div>
                        <div className='Home__team-classMate'>
                            <div className='Home__team-classMate-name'>유성우<span className='Home__team-classMate-specific'>(부팀장)</span></div>
                            <ol className='Home__team-classMate-detail'>
                                <li>PE (project engineer_ 실제 구현) </li>
                                <li>DB </li>
                                <li>Crawler Cronjob </li>
                                <li>Frontend-검색 </li>
                                <li>Cloud Migration </li>
                                <li>인트로 영상 제작 </li>
                            </ol>
                        </div>
                        <div className='Home__team-classMate'>
                            <div className='Home__team-classMate-name'>이길화</div>
                            <ol className='Home__team-classMate-detail'>
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
                            <ol className='Home__team-classMate-detail'>
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