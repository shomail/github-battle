import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import Popluar from './components/Popular';
import Battle from './components/Battle';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Github Explorer</h1>
        <Battle />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
