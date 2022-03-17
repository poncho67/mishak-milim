import React, {Component} from 'react';
import { useState } from 'react';

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
               <button onClick={() => this.getWord()}> Get word </button>
               <div>{this.state.currentWord}</div>
               <h2>Add new </h2>
                <input onChange={this.onChangeHandler} type="text"/>
                <button onClick={this.onClickHandler}>Post word</button>
           </div>
       )
   }
}

export default App;