import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Messages from './Messages';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MovieListItem from './Movie/MovieListItem';
import MovieDetail from './Movie/MovieDetail';

// Needed for onTouchTap
injectTapEventPlugin();

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: []
    };

    this._fetchMovieList = this._fetchMovieList.bind(this);
  }

  componentWillMount() {
    this._fetchMovieList();
  }

  render() {
    const movieList = this._getReadMovieList();
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <MovieDetail/>
        <div className="row">

          <div className="movie-list">
            {movieList}
          </div>

          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                  mollis euismod. Donec sed odio dui.</p>
                <a href="#" role="button" className="btn btn-default" onClick={this._fetchMovieList}>View details</a>
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

          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                  mollis euismod. Donec sed odio dui.</p>
                <a href="#" role="button" className="btn btn-default" onClick={this._fetchMovieList}>View details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getReadMovieList() {
    return this.state.movieList.map((movieInfo) => {
      console.log(movieInfo);
      return <MovieListItem
                //{...movie}
                movieInfo={movieInfo}
                //  id={comment.id}
                //  author={comment.author}
                //  body={comment.body}
                //  avatarUrl={comment.avatarUrl}
                // onDelete={this._deleteComment}
                // onDelete={(commentID) => this._deleteComment(commentID)}
                //  onDelete={this._deleteComment.bind(this)}
                key={movieInfo.movieCd} />
    });
  }

  _fetchMovieList() {
    axios.post('/readMovieList', {
      query: {},
      fields: null,
      options: { sort: { openDt: -1 } }
    })
    .then((response) => {
      this.setState({ movieList: response.data });
    })
    .catch(function (error) {
      // TODO: error handling
      console.log(error);
    });
  }
}


const mapStateToProps = (state) => {
  return {
    // isOpenPopup: state.moviePopup.isOpenPopup,
    // movieInfo: state.moviePopup.movieInfo,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
