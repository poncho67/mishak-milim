import React, {Component} from 'react';
import MyCountDown from '../components/MyCountDown'

class PantomimePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWord: ''
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

export default PantomimePage;