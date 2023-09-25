// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';
import CardList from "./component/CardList.jsx"; // Updated import path

function App() {
  return (
    <div className="App">
      <h1>React To-Do List</h1>
      <CardList />
    </div>
  );
}

export default App;
