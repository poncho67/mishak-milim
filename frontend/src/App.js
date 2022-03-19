import React, {Component} from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


class HomePage extends Component {
    render() {
       return (
        <h2>המשחקיה </h2>
       )
    }
}

class PantomimePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWord: 'אוצר מילים'
        };
    }

    onChangeHandler=(event)=>{
       var mydata = event.target.value;
       this.setState({postNewWord:mydata})
    }


    getWord() {
       fetch('./word', { method: 'GET' })
       .then(data => data.json())
       .then(json => this.setState({ currentWord: json['word'] }))
    }

    render() {
        return (
            <div>
                <button variant="primary" className="btn-primary" onClick={() => this.getWord()}> חפש מילה </button>
                <div>{this.state.currentWord}</div>
            </div>
        );
    }
}

class AddWordPage extends Component {
     constructor(props) {
        super(props);
        this.state = {
            postNewWord: "",
            postResult: ""
        };
    }

     postNewWord=()=>{
        const json_body = JSON.stringify({ word: this.state.postNewWord });
        console.log('json_body: ' + json_body)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        };
        fetch('./word', requestOptions)
            .then(response => response.json())
    }

     render() {
        return (
            <div>
                <h2>הצע מילה חדשה </h2>
                <input onChange={this.onChangeHandler} type="text"/>
                <button variant="secondary" onClick={this.postNewWord}>שלח</button>
            </div>
        );
    }
}

class NavigationBar extends Component {
    render() {
       return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/Home">המשחקיה</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/Home">עמוד הבית</Nav.Link>
                            <NavDropdown title="משחקים" id="basic-nav-dropdown">
                                  <NavDropdown.Item href="/PantomimePage">פנטומימה</NavDropdown.Item>
                                  <NavDropdown.Item href="#action/3.2">קונטקט</NavDropdown.Item>
                                  <NavDropdown.Item href="#action/3.3">כיד הדמיון</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/AddWordPage">הוסף מילה</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
       );
    }
}

class App extends Component {
   render() {
       return (
           <div>
               <NavigationBar />
               <Router>
                   <Routes>
                       <Route path="/Home" caseSensitive={false} element={<HomePage />} />
                       <Route path="/PantomimePage" caseSensitive={false} element={<PantomimePage />} />
                       <Route path="/AddWordPage" caseSensitive={false} element={<AddWordPage />} />
                    </Routes>
               </Router>
           </div>
       )
   }
}

export default App;