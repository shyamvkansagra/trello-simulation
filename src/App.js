import React from 'react';
import './App.css';
import DataApis from './api/api';

import TrelloBoard from './TrelloBoard/TrelloBoard';

function App() {
  DataApis.checkAndInit();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trello simulation</h1>  
      </header>
      <TrelloBoard DataApis={DataApis} />
    </div>
  );
}

export default App;
