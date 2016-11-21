import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Constant from '../common/Constant';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
injectTapEventPlugin();

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpen  = this.handleOpen.bind(this);
    this.handleClose   = this.handleClose.bind(this);

    this.state = {
      open: false
    };
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                  mollis euismod. Donec sed odio dui.</p>
                <a href="#" role="button" className="btn btn-default" data-toggle="modal" data-target={"#".concat(Constant.movieDetailPopupId)}>View details</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                  mollis euismod. Donec sed odio dui.</p>
                <RaisedButton label="View details" onTouchTap={this.handleOpen}/>
              </div>
            </div>
          </div>

          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            The actions in this window were passed in as an array of React objects.
          </Dialog>

          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                  mollis euismod. Donec sed odio dui.</p>
                <a href="#" role="button" className="btn btn-default">View details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
