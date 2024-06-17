import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LiveVideo from './lives/LiveVideo.js';
import axios from 'axios';
import '../../assets/styles/LiveProducts.css';
import Samples from '../../sampleDatas/GetLives.json';

function LiveProduct(){
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [isIdExist, setIsIdExist] = useState(false);
    const [productData, setProductData] = useState(null);
    let liveVideoUrl = "https://live-ch1.cjonstyle.net/cjmalllive/_definst_/stream2/playlist.m3u8";
    let posterUrl = '//thumb.cjonstyle.net/unsafe/410x230/itemimage.cjonstyle.net/goods_images/20/901/2032168901L.jpg?timestamp=20240507110833';
    
    useEffect(() => {
        const checkProductExistence = () => {
            let foundProduct = null;

            Samples.forEach(site => {
                site.products.forEach(product => {
                    if (product.p_id === id) {
                        foundProduct = product;
                    }
                });
            });

            if (foundProduct) {
                setIsIdExist(true);
                setProductData(foundProduct);
                console.log("ID Exists!");
            } else {
                setIsIdExist(false);
                console.log("ID Does not Exist");
            }
        };

        checkProductExistence();
    }, [id]);

    // useEffect(() => {
    //     axios.get('../../sampleDatas/GetLives.json')
    //         .then(response => {
    //             const data = response.data;
    //             let foundProduct = null;

    //             data.forEach(site => {
    //                 site.products.forEach(product => {
    //                     if (product.p_id === id) {
    //                         foundProduct = product;
    //                     }
    //                 });
    //             });

    //             if (foundProduct) {
    //                 setIsIdExist(true);
    //                 // setProducts(data);
    //                 setProductData(foundProduct);
    //                 console.log("ID Exists!");
    //             } else {
    //                 setIsIdExist(false);
    //                 console.log("ID Does not Exist");
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error fetching the data:", error);
    //             setIsIdExist(false);
    //         });
    // }, [id]);
    
    if (!isIdExist){
        return <h1>There is no id :(</h1>
    }
    
    return(
        <div>
            <h1>{ id }</h1>
            <div className='products'>
                <div className='mainLiveProducts'>
                    <div className='liveVideoFrame'>
                        <LiveVideo src={liveVideoUrl} poster={posterUrl} className='liveVideo'/>
                    </div>
                    <div className='liveProductInfo'>
                        
                    </div>
                </div>
                <div className='relatedProducts'>
                    <h4>가격 비교</h4>  
                    {products.map((prod, idx) => (
                        // Products
                        <div className='product' key={idx}>
                            <div className='productImage'>
                                <img src={prod.p_url} alt={prod.p_name}/>
                                <p>{prod.p_name}</p>
                                <p>{prod.p_price}</p>
                            </div>

                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LiveProduct;