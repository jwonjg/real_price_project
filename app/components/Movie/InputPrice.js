import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import { submitRealPrice } from '../../actions/price';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class InputPrice extends React.Component {
  constructor() {
    super();

    this.handleClose  = this.handleClose.bind(this);
    this.handleSubmitRealPrice  = this.handleSubmitRealPrice.bind(this);

    this.state = {
      open: false
    };
  }

  handleClose() {
    this.setState({open: false});
  };

  handleSubmitRealPrice() {
    if(this.props.isOpenPopup) {
      // TODO: 로그인 상태에서만 입력 가능함
      this.props.dispatch(submitRealPrice({
        movieCd: "jwonjg@naver.com",
        email: this.props.movieInfo.movieCd,
        realPrice: 20000})
      );
    }
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
        onTouchTap={this.handleSubmitRealPrice}
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
          <AutoComplete
            hintText="your price here"
            floatingLabelText="Real Price"
            fullWidth={true}
          />
          The actions in this window were passed in as an array of React objects.
        </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(InputPrice);
