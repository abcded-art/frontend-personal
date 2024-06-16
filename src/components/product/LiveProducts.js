import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LiveVideo from './lives/LiveVideo.js';
import axios from 'axios';
import '../../assets/styles/LiveProducts.css';
import cjonstyleImage from '../../assets/images/Malls/CJOnStyle.png'
import hyundaiImage from '../../assets/images/Malls/Hyundai.png'
import gsshopImage from '../../assets/images/Malls/GSShop.png'
import lotteImage from '../../assets/images/Malls/Lotte.png'

const mallImages = {
    cjonstyle: cjonstyleImage,
    gsshop: gsshopImage,
    hmall: hyundaiImage,
    lotteimall: lotteImage,
}

function LiveProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const liveVideoUrls = {
        cjonstyle: "https://live-ch1.cjonstyle.net/cjmalllive/_definst_/stream2/playlist.m3u8",
        gsshop: "https://gstv-gsshop.gsshop.com/gsshop_hd/_definst_/gsshop_hd.stream/chunklist.m3u8",
        hmall: "https://dtvstreaming.hyundaihmall.com/newcjp3/_definst_/newcjpstream.smil/chunklist_b3000000.m3u8",
        lotteimall: "https://mohlslive.lotteimall.com/live/livestream/chunklist.m3u8",
    };

    const posterUrl = '//thumb.cjonstyle.net/unsafe/410x230/itemimage.cjonstyle.net/goods_images/20/901/2032168901L.jpg?timestamp=20240507110833';

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productResponse = await axios.get(`http://43.203.249.162:8000/api/live/details?product_id=${id}`);
                console.log("Product Details Response: ", productResponse.data);
                setProduct(productResponse.data.details);
                
                const similarResponse = await axios.get(`http://43.203.249.162:8000/api/compare/details?product_id=${id}`);
                console.log("Similar products response: ", similarResponse.data);
                setSimilarProducts(similarResponse.data.result.product_list);

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product details", error);
                setLoading(true);
            }
        };

        fetchProductDetails();
    }, [id]);

    if(loading){
        return <h1> Loading ... </h1>;
    }

    if(!product) {
        return <h1> Product not found </h1>;
    }

    const liveVideoUrl = liveVideoUrls[product.site_name];

    return (
        <>
            <h1>{id}</h1>
            <div className='products'>
                <div className="mainLiveProducts">
                    <div className="liveVideoFrame">
                        {product.now_live_yn === "y" ? (
                            <LiveVideo src={liveVideoUrl} className="liveVideo" />
                        ) : (
                            <img src={product.img_url} alt={product.p_name} className="productImage" />
                        )}
                    </div>
                    <div className="liveProductInfo">
                        <div className="liveProduct-first-row">
                            <img src={mallImages[product.site_name]} alt={product.site_name} className="shoppingMallLogoImage" />
                            <div className="liveProduct-nowStart-or-willStart">
                                {product.now_live_yn === "y" ? "Now Live" : ""}
                            </div>
                        </div>
                        <div className="liveProduct-second-row">
                            <div className="productName">{product.p_name}</div>
                        </div>
                        <div className="liveProduct-last-row">
                            <div className="liveProduct-price">{product.p_price}</div>
                            <a href={product.purchase_link} className="liveProduct-link">Purchase</a>
                        </div>
                    </div>
                </div>
                <div className="relatedProducts">
                    <h4>가격 비교</h4>
                    {similarProducts.map((prod, idx) => (
                        <div className="product" key={idx}>
                            <div className="productImage">
                                <img src={prod.img_url} alt={prod.s_name} />
                                <p>{prod.s_name}</p>
                                <p>{prod.s_price}</p>
                                <a href={prod.redirect_url} className="purchase-link">Buy</a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </>
    );
}

export default LiveProduct;