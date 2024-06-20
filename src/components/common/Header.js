/* eslint-disable */
import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../../assets/styles/Header.css';

function Header() {
    // // 시스템 다크 모드 설정을 가져와 초기화
    // const [isDarkMode, setIsDarkMode] = useState(() => {
    //     const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     return prefersDarkMode;
    // });

    // useEffect(() => {
    //     if (isDarkMode) {
    //         document.body.classList.add('dark-mode');
    //     } else {
    //         document.body.classList.remove('dark-mode');
    //     }
    // }, [isDarkMode]);

    // const toggleDarkMode = () => {
    //     setIsDarkMode(!isDarkMode);
    // };
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    return (
        <div className={`Header ${isDarkMode ? 'dark-mode' : ''}`}>
            <Navbar collapseOnSelect expand="lg" className='custom-navbar'>
                <Container>
                    <Navbar.Brand href="/" className={isDarkMode ? "dark-mode" : ""}>
                    QuickCatch!
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                        </Form>
                        <Nav>
                            <Nav.Link href="#deets">로그인</Nav.Link>
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
