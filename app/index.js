import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import Popluar from './components/Popular';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Github Explorer</h1>
        <Popluar />
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));