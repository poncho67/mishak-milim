import React, {Component} from 'react';

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

export default AddWordPage;