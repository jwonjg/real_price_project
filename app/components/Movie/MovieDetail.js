import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import InputPrice from './InputPrice';
import { closeMovieDetailPopup } from '../../actions/movie';


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class MovieDetail extends React.Component {
  constructor() {
    super();

    this.handleClose  = this.handleClose.bind(this);
    this.handleChildOpen  = this.handleChildOpen.bind(this);
  }

  handleClose() {
    if(this.props.isOpenPopup) {
      this.props.dispatch(closeMovieDetailPopup());
    }
  };

  handleChildOpen() {
    // TODO: redux 패턴 적용
    this.setState({childOpen: true});
  };

  render() {
    console.log("movieDetailPopup");
    console.log(this.props.movieInfo);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
        <Dialog
          title="Movie Detail Popup"
          actions={actions}
          modal={false}
          open={this.props.isOpenPopup}
          onRequestClose={this.handleClose}
        >
          <h3>{this.props.movieInfo.realPrice}</h3>
          The actions in this window were passed in as an array of React objects.

          <RaisedButton label="Input Price" onTouchTap={this.handleChildOpen}/>

          <InputPrice open={this.state.childOpen} />

        </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpenPopup: state.moviePopup.isOpenPopup,
    movieInfo: state.moviePopup.movieInfo
  };
};

export default connect(mapStateToProps)(MovieDetail);
