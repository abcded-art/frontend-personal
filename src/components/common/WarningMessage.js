import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../assets/styles/WarningMessage.css';
import classNames from 'classnames';

function WarningMessage ({ show, onClose, isDarkMode }) {
    const [error, setError] = useState('');

    const handleClose = () => {
        onClose();
        setError('');
    };

    return(
        <CSSTransition
        in={show}
        timeout={500}
        classNames="alert"
        unmountOnExit
        >
            <div className='WarningMessage__MainContainer' onClick={handleClose}>
            <div className={classNames("with-box", {'dark': isDarkMode})} onClick={(e) => e.stopPropagation()}>
                <button className="with-close-button" onClick={handleClose}>X</button>
                <div className='WarningMessage__Warning-Message'>
                    방송이 지난 상품의 가격비교는 제공되지 않을 수 있습니다.
                </div>
            </div>
            </div>
        </CSSTransition>

    );
}

export default WarningMessage;