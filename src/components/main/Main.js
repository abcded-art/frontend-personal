import React, { useState, useCallback } from 'react';
import SearchBar from '../common/SearchBar';
import TVShopping from './main-tv/TVShopping';
import SpecialOffers from './main-hotdeal/SpecialOffers';
import Calendar from './main-tv/Calendar.js';

function Main(){
    const [selectedTab, setSelectedTab] = useState('TV쇼핑');

    return (
        <>
            <SearchBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'TV쇼핑' && (
                <div>
                    <Calendar />
                    <TVShopping />
                </div>
            )}
            {selectedTab === '특가' && <SpecialOffers />}
            
        </>
    );
}

export default Main;