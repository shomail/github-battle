import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Popular from './components/Popular';
import Battle from './components/Battle';
import Results from './components/Results';
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
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route render={() => <h1>404 Page Not Found!</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
