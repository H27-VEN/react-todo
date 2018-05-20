import React, { Component } from 'react';
import Todolist from '../component/Todolist';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todolist />
      </div>
    );
  }
}

export default App;
