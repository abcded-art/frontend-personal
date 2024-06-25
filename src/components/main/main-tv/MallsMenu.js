import React, { useState, useEffect } from 'react';
import cjonstyleImage from '../../../assets/images/Malls/CJOnStyle.png';
import hyundaiImage from '../../../assets/images/Malls/Hyundai.png';
import gsshopImage from '../../../assets/images/Malls/GSShop.png';
import lotteImage from '../../../assets/images/Malls/Lotte.png';

import '../../../assets/styles/MallsMenu.css';

const mallImages = {
    cjonstyle: cjonstyleImage,
    gsshop: gsshopImage,
    hmall: hyundaiImage,
    lotteimall: lotteImage,
};

const mallNames = ["cjonstyle", "gsshop", "hmall", "lotteimall"];

const MallsMenu = ({ onSelectionChange }) => {
    const [selectedMalls, setSelectedMalls] = useState(mallNames);

    useEffect(() => {
        onSelectionChange(selectedMalls);
    }, []);

    const handleCheckboxChange = (mall) => {
        setSelectedMalls(prev => {
            const newSelection = prev.includes(mall) ? prev.filter(name => name !== mall) : [...prev, mall];
            onSelectionChange(newSelection);
            return newSelection;
        });
    };

    return (
        <div className='fixContainer'>
            <div className='menuContainer'>
                <div className="checkbox-list">
                    {mallNames.map((mallName, i) => (
                        <div key={i} className="checkbox-item">
                            <input
                                type='checkbox'
                                id={`mall-${i}`}
                                name='mall'
                                value={mallName}
                                checked={selectedMalls.includes(mallName)}
                                onChange={() => handleCheckboxChange(mallName)}
                            />
                            <label htmlFor={`mall-${i}`}>
                                <img
                                    src={mallImages[mallName]}
                                    alt={mallName}
                                    className='checkboxMallLogo'
                                />
                                {mallName}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MallsMenu;