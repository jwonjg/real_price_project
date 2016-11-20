import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './Account/Login';
import Signup from './Account/Signup';
import MovieDetail from './Movie/MovieDetail';
import InputPrice from './Movie/InputPrice';

class App extends React.Component {
  render() {
    return (
      <div>
        <Login/>
        <Signup/>
        <Header/>
        <MovieDetail/>
        <InputPrice/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App;
