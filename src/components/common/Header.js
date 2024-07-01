// [Header.js]
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { FaSun, FaMoon, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/Header.css';
import quickCatchLogo from '../../assets/images/quickcatch_logo.png';

function Header({ onWithClick }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

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

    return (
        <div className={`Header ${isDarkMode ? 'dark-mode' : ''}`}>
            <Navbar collapseOnSelect expand="lg" className='custom-navbar'>
                <Container>
                    <Navbar.Brand href="/" className={isDarkMode ? "dark-mode" : ""}>
                        <img src={quickCatchLogo} alt="QuickCatch Logo" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <FormControl 
                                type="search" 
                                placeholder="Search" 
                                className="me-2" 
                                aria-label="Search" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                        </Form>
                        <Nav>
                            <Link to={`/TVShopping`} className='linkToTVShopping'>
                                <FaShoppingCart />
                            </Link>
                            <Link to={`/search`} className='linkToSearch'>
                                <FaSearch />
                            </Link>
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