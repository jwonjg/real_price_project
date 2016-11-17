import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './Account/Login';
import Signup from './Account/Signup';

class App extends React.Component {
  render() {
    const loginPopupId = "loginPopup";
    const signupPopupId = "signupPopup";
    
    return (
      <div>
        <Login loginPopupId={loginPopupId}></Login>
        <Signup signupPopupId={signupPopupId}></Signup>
        <Header loginPopupId={loginPopupId} signupPopupId={signupPopupId}/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App;
