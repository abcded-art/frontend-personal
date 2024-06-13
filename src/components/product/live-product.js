import React from 'react';
import { useParams } from 'react-router-dom';
import LiveVideo from './lives/LiveVideo.js';

function LiveProduct(){
    const { id } = useParams();
    let live_id = "cjonstyle_123";
    return(
        <div>
            <h1>{ id }</h1>
            <LiveVideo live_id={live_id}/>
        </div>
    );
}

export default LiveProduct;