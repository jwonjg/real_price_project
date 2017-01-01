import React from 'react';
import { connect } from 'react-redux';

class MovieListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let thumbnail = this.props.thumbnail;
    console.log(thumbnail);
    let divStyle = {
      backgroundImage: 'url('+thumbnail+')'
    }
    return (
      <div className="col-sm-4">
        <div className="panel">
          <div className="panel-body" style={divStyle}>
            <h3>{this.props.movieNm}</h3>
            <p>{this.props.story}</p>
            <a href="#" role="button" className="btn btn-default">View details</a>
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

export default connect(mapStateToProps)(MovieListItem);
