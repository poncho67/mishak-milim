import React, {Component} from 'react';
import { useState } from 'react';

import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWord: 'אוצר מילים',
            postNewWord: "",
            postResult: ""
        };
    }

    onChangeHandler=(event)=>{
       var mydata = event.target.value;
       this.setState({postNewWord:mydata})
    }

    onClickHandler=()=>{
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


   getWord() {
       fetch('./word', { method: 'GET' })
       .then(data => data.json())
       .then(json => this.setState({ currentWord: json['word'] }))
   }


   render() {
       return (
           <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                      <NavDropdown.Divider />
                                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


               <button variant="primary" className="btn-primary" onClick={() => this.getWord()}> Get word </button>
               <div>{this.state.currentWord}</div>
               <h2>Add new </h2>
               <input onChange={this.onChangeHandler} type="text"/>
               <button variant="secondary" onClick={this.onClickHandler}>Post word</button>
           </div>
       )
   }
}

export default App;