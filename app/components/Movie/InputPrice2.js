import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class InputPrice2 extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose  = this.handleClose.bind(this);

    this.state = {
      open: false
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
          title="Input Price Popup"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
    );
  }
}
