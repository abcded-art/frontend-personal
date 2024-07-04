// [Header.js]
/* eslint-disable */
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
    const navigate = useNavigate();
    const location = useLocation();

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
        navigate(`/search?q=${searchQuery}`);
    };

    const fetchSuggestions = async (query) => {
        try {
            const { frontendAddr } = config;
            const response = await axios.post(`http://${frontendAddr}:5005/api/search`, { query });
            setSuggestions(response.data.hits.hits.map(hit => ({
                name: hit._source.name,
                id: hit._source.product_id
            })));
        } catch (error) {
            console.error("Failed to fetch suggestions from Elasticsearch", error);
            setSuggestions([]);
        }
    };

    useEffect(() => {
        if (searchQuery.length >= 2) {
            const timer = setTimeout(() => {
                fetchSuggestions(searchQuery);
            }, 300);

            return () => clearTimeout(timer);
        } else {
            setSuggestions(null);
        }
    }, [searchQuery]);

    const handleSuggestionClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className={`Header ${showHeader ? 'visible' : 'hidden'} ${isDarkMode ? 'dark-mode' : ''}`}>
            <Navbar collapseOnSelect expand="lg" className='custom-navbar'>
                <Container>
                    <Navbar.Brand href="/TVShopping" className={isDarkMode ? "dark-mode" : ""}>
                        <img src={quickCatchLogo} alt="QuickCatch Logo" style={{ height: '5vh' }} />
                    </Navbar.Brand>
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
                            />
                            {suggestions && suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion.id)}>
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