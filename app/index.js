import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Popular from './components/Popular';
import Battle from './components/Battle';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light',
        }));
      },
    };
  }

  render() {
    const { theme, toggleTheme } = this.state;
    return (
      <Router>
        <ThemeProvider value={{ theme, toggleTheme }}>
          <div className={theme}>
            <div className="container">
              <Nav />
              <h1>Github Explorer</h1>
              <Route exact path="/" component={Popular} />
              <Route path="/battle" component={Battle} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
