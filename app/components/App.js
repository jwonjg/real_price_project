import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MovieDetail from './Movie/MovieDetail';
import InputPrice from './Movie/InputPrice';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Header/>
        <MovieDetail/>
        <InputPrice/>
        {this.props.children}
        <Footer/>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
