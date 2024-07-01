import React, {useState} from 'react';
import '../../assets/styles/AWSCloudSchoolCooperators.css';

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
                    <div className='schoolTeamLogo row1 column1'>
                        <img src='/logos/dapanda_logo.png' alt='Dapanda Logo' />
                    </div>
                    <div className='schoolTeamLogo row1 column2'>
                        <img src='/logos/interviewmaster_logo.png' alt='Interview Master Logo' />
                    </div>
                    <div className='schoolTeamLogo row2 column1'>
                        <img src='/logos/mylittlerecipebook_logo.png' alt='My Little recipe Logo' />
                    </div>
                    <div className='schoolTeamLogo row2 column2'>
                        <img src='/logos/placeholder_logo.png' alt='Place holder Logo' />
                    </div>
                    <div className='schoolTeamLogo row3 column1'>
                        <img src='/logos/quickcatch_logo.png' alt='Quick Catch Logo' />
                    </div>
                    <div className='schoolTeamLogo row3 column2'>
                        <img src='/logos/spoid_logo.png' alt='Spoid Logo' />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default AWSCloudSchoolCooperators;