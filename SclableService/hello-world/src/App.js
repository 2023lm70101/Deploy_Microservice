import React from 'react';
import './App.css';

function callApi() {
  fetch('http://localhost:2300/', { method: 'GET' })
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