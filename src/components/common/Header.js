import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { FaSun, FaMoon, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { ImHome3 } from "react-icons/im";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../../assets/styles/Header.css';
import axios from 'axios';
import quickCatchLogo from '../../assets/images/QuickCatch_Logo_Simple.png';
import config from '../../config.js';

function Header({ showHeader, onWithClick }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSuggestions([]);
        navigate(`/search?q=${searchQuery}`);
    };

    const fetchSuggestions = async (query) => {
        try {
            const { frontendAddr } = config;
            const response = await axios.post(`http://${frontendAddr}:5005/api/search`, { query });
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
        if (!event.target.closest('.me-2') && !event.target.closest('.suggestions-list')) {
            setSuggestions([]);
            setInputFocused(false);
            setSearchQuery('');
        }
    };

    const handleSuggestionClick = (id) => {
        if (id) {
            navigate(`/product/${id}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
            setTimeout(() => {
                handleSearchSubmit(e);
            }, 300);
        }
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    useEffect(() => {
        setSuggestions(null);
    }, [location]);

    useEffect(() => {
        if (searchQuery.length >= 1) {
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
        <div className={`Header ${showHeader ? 'visible' : 'hidden'} ${isDarkMode ? 'dark-mode' : ''}`}>
            <Navbar collapseOnSelect expand="lg" className='custom-navbar'>
                <Container>
                    <Link to="/TVShopping" className={`navbar-brand ${isDarkMode ? "dark-mode" : ""}`}>
                        <img src={quickCatchLogo} alt="QuickCatch Logo" style={{ height: '5vh' }} />
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Form className="d-flex" onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={handleFocus}
                                onKeyDown={handleKeyDown}
                            />
                            {suggestions && (
                                <ul className='suggestions-list'>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} onClick={suggestion.id ? () => handleSuggestionClick(suggestion.id) : null}>
                                            {suggestion.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Form>
                        <Nav>
                            <Link to={`/`} className='linkToHome'>
                                <ImHome3 />
                            </Link>
                            <Link to={`/TVShopping`} className='linkToTVShopping'>
                                <FaShoppingCart />
                            </Link>
                            {/* <Link to={`/search`} className='linkToSearch'>
                                <FaSearch />
                            </Link> */}
                            <div className='withAWSCloudSchool' onClick={onWithClick}>with</div>
                            <Nav.Link onClick={toggleDarkMode}>
                                {isDarkMode ? <FaMoon className="light-dark-icon" /> : <FaSun className="light-dark-icon" />}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;