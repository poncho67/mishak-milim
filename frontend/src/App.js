import logo from './logo.svg';
import './App.css';


function callApi() {
//  alert('Button was pressed!');
//  .then(data => alert(data))
  fetch('./api/generate', { method: 'GET' })
   .then(data => data.json())
   .then(json => alert(JSON.stringify(json)))
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <button onClick={callApi}>Call API</button>
      </header>
    </div>
  );
}

export default App;
