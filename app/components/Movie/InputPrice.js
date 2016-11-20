import React from 'react';
import { connect } from 'react-redux';
import Constant from '../../common/Constant';

class InputPrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal fade" id={Constant.inputPricePopupId} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              <p>This is a modal.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(InputPrice);
