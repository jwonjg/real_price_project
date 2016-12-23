import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import Messages from '../Messages';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
  }

  handleFacebook() {
    this.props.dispatch(facebookLogin())
  }

  handleTwitter() {
    this.props.dispatch(twitterLogin())
  }

  handleGoogle() {
    this.props.dispatch(googleLogin())
  }

  handleVk() {
    this.props.dispatch(vkLogin())
  }

  handleGithub() {
    this.props.dispatch(githubLogin())
  }

  render() {
    const question = "Don't have an account? ";
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.props.handlePopup}
      />,
    ];
    return (
      <Dialog
        title="Log In"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.handlePopup}
      >
            <div className="card-content">
              <Messages messages={this.props.messages}/>
              <form onSubmit={this.handleLogin.bind(this)}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="Email" autoFocus className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="form-group text-center">
                  <div className="btn-toolbar text-center">
                    <Link to="/forgot"><strong>Forgot your password?</strong></Link>
                    <p className="text-center">
                    {question}
                    <Link to="/signup"><strong>Sign up</strong></Link>
                    </p>
                  </div>
                </div>
                <div className="form-group text-center">
                  <RaisedButton primary={true} fullWidth={true} type="submit" label="Log in"/>
                </div>
              </form>
            </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Login);
