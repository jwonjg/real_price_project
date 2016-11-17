import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './Account/Login';
import Signup from './Account/Signup';

class App extends React.Component {
  render() {
    return (
      <div>
        <Login/>
        <Signup/>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App;
