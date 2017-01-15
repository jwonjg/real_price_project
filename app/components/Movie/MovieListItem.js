import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { openMovieDetailPopup } from '../../actions/movie';

class MovieListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpen  = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.props.dispatch(openMovieDetailPopup(this.props.movieInfo));
  };

  render() {
    let thumbnail = this.props.movieInfo.thumbnail.replace("http://", "https://");
    console.log(thumbnail);
    let divStyle = {
      backgroundImage: 'url('+thumbnail+')'
    }
    return (
      <div className="col-sm-4">
        <div className="panel">
          <div className="panel-body" style={divStyle}>
            <h3>{this.props.movieInfo.movieNm}</h3>
            <p>{this.props.movieInfo.story}</p>
          <RaisedButton label="View details" onTouchTap={this.handleOpen}/>
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
