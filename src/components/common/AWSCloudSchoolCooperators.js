import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../assets/styles/AWSCloudSchoolCooperators.css';
import { Link } from 'react-router-dom';

function AWSCloudSchoolCooperators({ show, onClose }) {
    const [error, setError] = useState('');

    const handleClose = () => {
        onClose();
        setError('');
    };

    // if (!show) return null;

    return (
        <CSSTransition
        in={show}
        timeout={500}
        classNames="alert"
        unmountOnExit
        >
            <div className="cloudSchoolCooperatorsContainer" onClick={handleClose}>
                <div className="with-box" onClick={(e) => e.stopPropagation()}>
                    <button className="with-close-button" onClick={handleClose}>X</button>
                    <form className="alert-form">
                        <div className='schoolTeamLogo'>
                            <div className='row'>
                                <Link to='#spoid' className='column'>
                                    <div className='schoolTeamLogoImgWrapper'>
                                        <img src='/logos/spoid_logo.png' alt='Spoid Logo' className='schoolTeamLogoImg' />
                                    </div>
                                    <div className='logoDescribe'>컴퓨터 견적의 최저가로 최적의 성능을 뽑아주는 Spoid 입니다. 여러 사이트의 가격 추세를 확인하고 알람을 통해  최저가로 견적 생성을 손쉽게 하세요!</div>
                                </Link>
                                
                                <Link to='#interview_master' className='column'>
                                    <div className='schoolTeamLogoImgWrapper'>
                                        <img src='/logos/interviewmaster_logo.png' alt='Interview Master Logo' className='schoolTeamLogoImg' />
                                    </div>
                                    <div className='logoDescribe'>InterviewMaster는 AI 기술을 활용하여 구직자들의 면접 준비를 돕는 혁신적인 서비스를 제공합니다. 개인 맞춤형 피드백과 실전 같은 모의 면접 경험을 제공하여, 당신의 면접 실력을 한 단계 끌어올리는 데 도움을 드립니다.</div>
                                </Link>
                            </div>
                            <hr/>
                            <div className='row'>
                                <Link to='#dapanda' className='column'>
                                    <div className='schoolTeamLogoImgWrapper'>
                                        <img src='/logos/dapanda_logo.png' alt='Dapanda Logo' className='schoolTeamLogoImg' />
                                    </div>
                                    <div className='logoDescribe'>네고에 지친 당신, DAPANDA에서 최적의 중고 거래를 경험해보세요. 경매의 재미와 다양한 물품  거래로 스트레스 없이 할 수 있는 중고거래, Welcome to DAPANDA!</div>
                                </Link>
                                <Link to='/' className='column'>
                                    <div className='schoolTeamLogoImgWrapper'>
                                        <img src='/logos/quickcatch_logo.png' alt='Quick Catch Logo' className='schoolTeamLogoImg' />
                                    </div>
                                    <div className='logoDescribe'>QuickCatch는 실시간 홈쇼핑 방송과 상품 정보, 그리고 해당 상품의 인터넷 최저가를 제공합니다. 또한, 알찬 리뷰 요약과 할인율 순위를 통해 최적의 쇼핑 환경을 제공합니다.</div>
                                </Link>
                            </div>
                            <hr/>
                            <div className='row'>
                                <Link to='#placeholder' className='column'>
                                    <div className='schoolTeamLogoImgWrapper'>
                                        <img src='/logos/placeholder_logo.png' alt='Placeholder Logo' className='schoolTeamLogoImg' />
                                    </div>
                                    <div className='logoDescribe'>약속 코스를 생각하기 힘든 적, 놀러 가고 싶은 지역의 혼잡도가 궁금한 적이 있으셨나요? PlaceHolder는 매주 업데이트되는 인기 가게들로 AI가 혼잡도를 고려한 약속 코스를 만들어 드립니다! 원하는 지역과 테마를 선택해 코스를 자동으로 생성하고 혼잡도를 실시간으로 확인해보세요.</div>
                                </Link>
                                <Link to='#recipebook' className='column'>
                                    <div className='schoolTeamLogoImgWrapper'>
                                        <img src='/logos/mylittlerecipebook_logo.png' alt='My Little Recipe Logo' className='schoolTeamLogoImg' />
                                    </div>
                                    <div className='logoDescribe'>1인 가구를 위한 스마트 요리 비서 My Little Recipe Book! 쉽고 빠른 레시피 검색, 인기 유튜브 요리 영상, 영양 정보, 냉장고 커스터마이징으로 유통기한 관리까지, 마리레와 함께 혼자서도 두렵지 않은 즐거운 요리를 경험하세요!</div>
                                </Link>
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
            </div>
        </CSSTransition>
    );
}

export default AWSCloudSchoolCooperators;