import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../../assets/styles/Header.css';
import axios from 'axios';
import quickCatchLogo from '../../assets/images/QuickCatch_Logo_Simple.png';
import quickCatchLogoDark from '../../assets/images/QuickCatch_Logo_Simple_Dark.png';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { config } from '../../config.js';

const { frontendAddr } = config;

function Header({ showHeader, onWithClick, isDarkMode, toggleDarkMode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchSubmit = () => {
        setSuggestions([]);
        navigate(`/search?q=${searchQuery}`);
    };

    const fetchSuggestions = async (query) => {
        try {
            const response = await axios.post(`${frontendAddr}/api/search`, { query });
            const fetchedSuggestions = response.data.hits.hits.map(hit => ({
                name: hit._source.name,
                id: hit._source.product_id
            }));
            setSuggestions(fetchedSuggestions.length > 0 ? fetchedSuggestions : [{ name: '연관 상품이 없습니다', id: null }]);
        } catch (error) {
            console.error("Failed to fetch suggestions from Elasticsearch", error);
            setSuggestions([{ name: '연관 상품이 없습니다', id: null }]);
        }
    };

    const handleFocus = () => {
        setInputFocused(true);
        if (searchQuery.length === 0) {
            setSuggestions([{ name: '상품을 검색하세요', id: null }]);
        } else {
            setSuggestions([]);
        }
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.Header_input') && !event.target.closest('.suggestions-list')) {
            setInputFocused(false);
            setSuggestions([]);
            
        }
    };

    const handleSuggestionClick = (id) => {
        setInputFocused(true);
        if (id) {
            navigate(`/product/${id}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setTimeout(() => {
                handleSearchSubmit(e);
            }, 300);
        }
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    useEffect(() => {
        setSuggestions(null);
    }, [location]);

    useEffect(() => {
        if (inputFocused && searchQuery.length >= 1) {
            fetchSuggestions(searchQuery);
            const timer = setTimeout(() => {
                fetchSuggestions(searchQuery);
            }, 200);

            return () => {
                clearTimeout(timer);
            };
            
        } else if (searchQuery.length === 0 && inputFocused) {
            setSuggestions([{ name: '상품을 검색하세요', id: null }]);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, inputFocused]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={`Header ${showHeader ? 'visible' : 'hidden'} ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="mx-auto flex justify-between items-center relative w-full px-8">
                <Link to='/TVShopping' className="flex items-center">
                    <img src={isDarkMode ? quickCatchLogoDark : quickCatchLogo} alt="Logo" className="w-13 h-9 mr-1" />
                </Link>

                <div className="flex-grow mx-5 relative">
                    <div className="relative">
                        <FaSearch
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer bg-transparent"
                            onClick={() => {
                                console.log("쿼리문의 결과이다: ",searchQuery);
                                if (searchQuery.trim() === '') {
                                    setSuggestions([{ name: '상품을 검색하세요', id: null}]);
                                } else {
                                    handleSearchSubmit();
                                }
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 Header_input  bg-neutral-100/80
                            border border-gray-300 dark:bg-neutral-900/80 transition duration-300 
                            "
                            value={searchQuery}
                            onChange={(e) =>{ 
                                setSearchQuery(e.target.value);
                                console.log("Current search query: ", e.target.value);
                            }}
                            onFocus={handleFocus}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    {suggestions && (
                        <ul className='suggestions-list rounded-md'>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={suggestion.id ? () => handleSuggestionClick(suggestion.id) : null}
                                    className="
                                    p-2.5 text-left flex items-center cursor-pointer px-4 
                                    bg-neutral-100/80 hover:bg-neutral-200/95
                                    dark:bg-neutral-700/80 dark:hover:bg-neutral-900/95
                                    "
                                >
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <nav className="hidden md:flex space-x-4">
                    <Link to='/' className="text-black transition-colors hover:text-gray-800
                    light-dark-mode
                    ">
                        Home
                    </Link>
                    <Link to='/TVShopping' className="text-black transition-colors hover:text-gray-800
                    light-dark-mode
                    ">
                        Shopping
                    </Link>
                    <div className="text-black transition-colors hover:text-gray-800 cursor-pointer
                     light-dark-mode
                    " onClick={onWithClick}>
                        with
                    </div>
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? <FaMoon className="light-dark-icon" /> : <FaSun className="light-dark-icon" />}
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;