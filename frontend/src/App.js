import React, {Component} from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import Countdown from 'react-countdown';


const Completionist = () => <span style="color: #ff0000">זמנך עבר!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return <span>{minutes}:{seconds}</span>;
  }
};

export const MyCountDown = () => {
  return <div><Countdown date={Date.now() + 120000} renderer={renderer} /></div>;
}


class HomePage extends Component {
    render() {
       return (
        <h2>המשחקיה</h2>
       );
    }
}

class DrawingPage extends Component {
    render() {
       return (
        <h2>כיד הדמיון</h2>
       );
    }
}

class ContactPage extends Component {
    render() {
       return (
        <h2>קונטקט</h2>
       );
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
       this.setState({postNewWord:mydata});
    }

    getWord() {
       fetch('./word', { method: 'GET' })
       .then(data => data.json())
       .then(json => this.setState({ currentWord: json['word'] }));
    }

    render() {
        return (
            <div>
                <button variant="primary" className="btn-primary" onClick={() => this.getWord()}> ג׳נרט לי מילה </button>
                <div>{this.state.currentWord}</div>
                <MyCountDown />
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
        console.log('json_body: ' + json_body);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        };
        fetch('./word', requestOptions)
            .then(response => response.json());
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
                    {/* Define all the routes */}
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