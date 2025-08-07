import React from 'react';
import PriceChart from './components/PriceChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Birhan Energies - Market Analysis Dashboard</h1>
      </header>
      <main>
        <PriceChart />
      </main>
    </div>
  );
}

export default App;