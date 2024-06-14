import React from 'react';
import '../../assets/styles/SearchBar.css';

function SearchBar( { selectedTab, setSelectedTab }){
    const tabs = ['TV쇼핑', '특가'];

    return (
        <div className='search-bar'>
            <div className='tabs'>
                {
                    tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`tab ${selectedTab === tab ? 'selected' : ''}`}
                            onClick={ () => setSelectedTab(tab) }
                        >
                            {tab}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SearchBar;