import React, {Component} from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import DrawingPage from './pages/DrawingPage'
import PantomimePage from './pages/PantomimePage'
import AddWordPage from './pages/AddWordPage'


class NavigationBar extends Component {
    render() {
       return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to={"/"}>המשחקיה</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to={"pantomime"}>פנטומימה</Nav.Link>
                                 <Nav.Link as={Link} to={"contact"}>קונטקט</Nav.Link>
                                 <Nav.Link as={Link} to={"drawing"}>כיד הדמיון</Nav.Link>
                                 <Nav.Link as={Link} to={"add"}>הוסף מילה</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
       );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavigationBar />
                <div className="main">
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="pantomime" element={<PantomimePage />}></Route>
                        <Route path="drawing" element={<DrawingPage />}></Route>
                        <Route path="contact" element={<ContactPage />}></Route>
                        <Route path="add" element={<AddWordPage />}></Route>
                        <Route path="*" element={<HomePage />}></Route>
                    </Routes>
                </div>
            </div>
        );
    }
}


export default App;