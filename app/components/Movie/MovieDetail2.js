import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class MovieDetail2 extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose  = this.handleClose.bind(this);

    this.state = {
      open: false,
      modal: false
    };
  }

  handleClose() {
    this.setState({open: false});
  };

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
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
        <Dialog
          title="Movie Detail Popup"
          actions={actions}
          modal={this.state.modal}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
    );
  }
}
