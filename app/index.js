import React from 'react';
import ReactDom from 'react-dom';
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
      <ThemeProvider value={{ theme, toggleTheme }}>
        <div className={theme}>
          <div className="container">
            <Nav />
            <h1>Github Explorer</h1>
            <Battle />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
