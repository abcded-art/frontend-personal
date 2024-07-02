import React, {useState} from 'react';
import '../../assets/styles/AWSCloudSchoolCooperators.css';
import { Link } from 'react-router-dom';

function AWSCloudSchoolCooperators({ show, onClose }) {
    const [error, setError] = useState('');

    const handleClose = () => {
        onClose(); 
        setError('');
    };

    if (!show) return null;

    return (
        <div className="cloudSchoolCooperatorsContainer" onClick={handleClose}>
            <div className="with-box" onClick={(e) => e.stopPropagation()}>
                <button className="with-close-button" onClick={handleClose}>X</button>
                <form className="alert-form">
                    <div className='schoolTeamLogo'>
                        <div className='row'>
                            <Link to='#dapanda' className='column'>
                                <img src='/logos/dapanda_logo.png' alt='Dapanda Logo' className='schoolTeamLogoImg'/>
                                <div className='logoDescribe'>네고에 지친 당신, DAPANDA에서 최적의 중고 거래를 경험해보세요. 경매의 재미와 다양한 물품  거래로 스트레스 없이 할 수 있는 중고거래, Welcome to DAPANDA!</div>
                            </Link>
                            <Link to ='#interview_master' className='column'>
                                <img src='/logos/interviewmaster_logo.png' alt='Interview Master Logo' className='schoolTeamLogoImg'/>
                                <div>대통령은 취임에 즈음하여 다음의 선서를 한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다.</div>
                            </Link>
                        </div>
                        <div className='row'>
                            <Link to ='#recipebook' className='column'>
                                <img src='/logos/mylittlerecipebook_logo.png' alt='My Little Recipe Logo' className='schoolTeamLogoImg'/>
                                <div>선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서 하되, 균등한 기회가 보장되어야 한다. 법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다.</div>
                            </Link>
                            <Link to ='#placeholder' className='column'>
                                <img src='/logos/placeholder_logo.png' alt='Placeholder Logo' className='schoolTeamLogoImg'/>
                                <div>대통령은 조약을 체결·비준하고, 외교사절을 신임·접수 또는 파견하며, 선전포고와 강화를 한다. 제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다.</div>
                            </Link>
                        </div>
                        <div className='row'>
                            <Link to ='#quickcatch' className='column'>
                                <img src='/logos/quickcatch_logo.png' alt='Quick Catch Logo' className='schoolTeamLogoImg'/>
                                <div>QuickCatch는 실시간 홈쇼핑 방송과 상품 정보, 그리고 해당 상품의 인터넷 최저가를 제공합니다. 또한, 알찬 리뷰 요약과 할인율 순위를 통해 최적의 쇼핑 환경을 제공합니다.</div>
                            </Link>
                            <Link to ='#spoid' className='column'>
                                <img src='/logos/spoid_logo.png' alt='Spoid Logo' className='schoolTeamLogoImg'/>
                                <div>컴퓨터 견적의 최저가로 최적의 성능을 뽑아주는 Spoid 입니다. 여러 사이트의 가격 추세를 확인하고 알람을 통해  최저가로 견적 생성을 손쉽게 하세요!</div>
                            </Link>
                        </div>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default AWSCloudSchoolCooperators;