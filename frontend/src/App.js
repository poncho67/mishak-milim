import logo from './logo.svg';
import './App.css';


function callApi() {
//  alert('Button was pressed!');
  fetch('./api/generate', { method: 'GET' })
  .then(data => alert(data))
//  .then(data => data.json())
//     // Parsing the data into a JavaScript object
//    .then(json => alert(JSON.stringify(json)))
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
