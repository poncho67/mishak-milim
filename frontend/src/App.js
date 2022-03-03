import React, {Component} from 'react';
import { useState } from 'react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWord: 'אוצר מילים'
        };
    }


   getWord() {
       fetch('./api/generate', { method: 'GET' })
       .then(data => data.json())
       .then(json => this.setState({ currentWord: json['word'] }))
   }


   render() {
       return (
           <div>
               <button onClick={() => this.getWord()}> Get word </button>
               <div>{this.state.currentWord}</div>
           </div>
       )
   }
}

export default App;