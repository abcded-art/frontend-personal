import React, {useState} from 'react';
import '../../../assets/styles/SetAlert.css';

function SetAlert({ show, onClose }) {
    const [alertType, setAlertType] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = () => {
        if (!inputValue) {
            setError('정보를 입력해주세요');
        } else {
            onClose(); // 입력된 정보가 있을 때 창을 닫음
            setAlertType('');
            setInputValue('');
            setError('');
        }
    };

    const handleClose = () => {
        onClose(); // 창을 닫음
        setAlertType('');
        setInputValue('');
        setError('');
    };

    if (!show) return null;

    return (
        <div className="alert-overlay" onClick={handleClose}>
            <div className="alert-box" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={handleClose}>X</button>
                <form className="alert-form">
                    <div>
                        <input
                            type="radio"
                            id="email"
                            name="alertType"
                            value="email"
                            checked={alertType === 'email'}
                            onChange={() => setAlertType('email')}
                        />
                        <label htmlFor="email">이메일 입력하기</label>
                    </div>
                    {alertType === 'email' && (
                        <input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    )}
                    <div>
                        <input
                            type="radio"
                            id="phone"
                            name="alertType"
                            value="phone"
                            checked={alertType === 'phone'}
                            onChange={() => setAlertType('phone')}
                        />
                        <label htmlFor="phone">전화번호 입력하기</label>
                    </div>
                    {alertType === 'phone' && (
                        <input
                            type="tel"
                            placeholder="전화번호를 입력하세요"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    )}
                    {error && <div className="error-message">{error}</div>}
                    <button type="button" className="confirm-button" onClick={handleConfirm}>확인</button>
                </form>
            </div>
        </div>
    );
}

export default SetAlert;