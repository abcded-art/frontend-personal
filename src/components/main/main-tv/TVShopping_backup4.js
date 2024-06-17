import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../assets/styles/TVShopping.css';
import cjonstyleImage from '../../../assets/images/Malls/CJOnStyle.png';
import hyundaiImage from '../../../assets/images/Malls/Hyundai.png';
import gsshopImage from '../../../assets/images/Malls/GSShop.png';
import lotteImage from '../../../assets/images/Malls/Lotte.png';

const mallImages = {
    cjonstyle: cjonstyleImage,
    gsshop: gsshopImage,
    hmall: hyundaiImage,
    lotteimall: lotteImage,
};

const mallNames = ["cjonstyle", "gsshop", "hmall", "lotteimall"];

function TVShopping() {
    const [selectedMalls, setSelectedMalls] = useState([0, 1, 2]);
    const [isSelecting, setIsSelecting] = useState(-1);
    const [tempSelection, setTempSelection] = useState([0, 1, 2]);
    const [liveData, setLiveData] = useState({
        cjonstyle: { products: [] },
        gsshop: { products: [] },
        hmall: { products: [] },
        lotteimall: { products: [] }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ cjonstyleRes, gsshopRes, hmallRes, lotteimallRes ] = await Promise.all([
                    axios.get('http://43.203.249.162:8000/api/live/mainlist?site_name=cjonstyle&date=2024-06-11'),
                    axios.get('http://43.203.249.162:8000/api/live/mainlist?site_name=gsshop&date=2024-06-11'),
                    axios.get('http://43.203.249.162:8000/api/live/mainlist?site_name=hmall&date=2024-06-11'),
                    axios.get('http://43.203.249.162:8000/api/live/mainlist?site_name=lotteimall&date=2024-06-11'),
                ]);

                console.log("Here are the result of the axios results");
                console.log(cjonstyleRes);
                console.log(gsshopRes);
                console.log(hmallRes);
                console.log(lotteimallRes);
                
                const newLiveData = {
                    cjonstyle: cjonstyleRes.data.result ? { products:cjonstyleRes.data.result.product_list } : { products: [] },
                    gsshop: gsshopRes.data.result ? { products:gsshopRes.data.result.product_list } : { products: [] },
                    hmall: hmallRes.data.result ? { products:hmallRes.data.result.product_list} : { products: [] },
                    lotteimall: lotteimallRes.data.result ? { products:lotteimallRes.data.result.product_list } : { products: [] }
                }

                console.log("Here are the new live data");
                console.log(newLiveData);

                setLiveData(newLiveData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data", error);
                setLiveData({
                    cjonstyle: { products: [] },
                    gsshop: { products: [] },
                    hmall: { products: [] },
                    lotteimall: { products: [] }
                });
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleMallClick = (index) => {
        setIsSelecting(index);
        setTempSelection([...selectedMalls]);
    };

    const handleConfirmSelection = () => {
        setSelectedMalls(tempSelection);
        setIsSelecting(-1);
    };

    const handleRadioChange = (mallIndex, position) => {
        const newSelection = [...tempSelection];
        newSelection[position] = mallIndex;
        setTempSelection(newSelection);
    };

    if (loading) {
        return <div> Loading.... </div>
    }

    return (
        <div className='Main'>
            <div className='mallSelectionButtons'>
                {
                    selectedMalls.map((mallIndex, position) => (
                        <div key={position} className='mallLogoContainer'>
                            <div onClick={() => handleMallClick(position)} className='fixMallLogoSize'>
                                <img
                                    src={mallImages[mallNames[mallIndex]]}
                                    alt={mallNames[mallIndex]}
                                    className='mallLogo'
                                />
                            </div>
                            {isSelecting === position && (
                                <div className={`radioToggle ${isSelecting === position ? 'show' : ''}`} >
                                    <section className="radio-section">
                                        <div className="radio-list">
                                            {mallNames.map((mallName, i) => (
                                                <div key={i} className="radio-item">
                                                    <input
                                                        type='radio'
                                                        id={`${position}-${i}`}
                                                        name={`mall-${position}`}
                                                        value={i}
                                                        checked={tempSelection[position] === i}
                                                        onChange={() => handleRadioChange(i, position)}
                                                    />
                                                    <label htmlFor={`${position}-${i}`}>
                                                        <img
                                                            src={mallImages[mallName]}
                                                            alt={mallName}
                                                            className='radioMallLogo'
                                                        />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <button onClick={handleConfirmSelection} className='confirmButton'>Confirm</button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
            <div className='mallsContainer'>
                { selectedMalls.map((mallIndex, position) => {
                    const site = liveData[mallNames[mallIndex]];
                    return (
                        <div key={ position } className='mallSelection'>
                            { site.products && site?.products.map((product, iter) => (
                                <div key={iter} className="product">
                                    <Link to={`/product/${product.p_id}`} className='customLink'>
                                        <div className='productImageAlign'>
                                            <div className='productImageFix'>
                                                <img src={product.img_url} alt={product.p_name} />
                                            </div>
                                        </div>
                                        <p className='productName'>{product.p_name}</p>
                                        <p className='productPrice'>{product.p_price}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TVShopping;