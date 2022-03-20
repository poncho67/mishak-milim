import React, {Component} from 'react';
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