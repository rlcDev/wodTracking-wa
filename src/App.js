import React from 'react';
import './App.css';
import RecordsComponent from './Records/RecordsComponent';
import AddRecord from './AddRecord';

function App() {
  return (
    <div className="container">
      <h3 className='text-center mb-3'>Wod tracking</h3>
      <RecordsComponent></RecordsComponent>
      <AddRecord></AddRecord>
    </div>
  );
}

export default App;
