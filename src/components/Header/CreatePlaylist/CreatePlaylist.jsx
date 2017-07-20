import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCreatePlaylistWindow } from '../../../actions';

const mapDispatchToProps = dispatch => ({
  onCloseCreatePlaylistWindow: () => {
    dispatch(toggleCreatePlaylistWindow());
  }
});
const mapStateToProps = (ownProps) => ({
  ...ownProps,
});

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }
  componentWillMount() {
    document.addEventListener('click', this.handleClickEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickEvent, false);
  }
  handleClickEvent($event) {
    if (!ReactDOM.findDOMNode(this).contains($event.target)) {
      this.props.onCloseCreatePlaylistWindow();
    }
  }
  render() {
    let title;
    let description;
    return (
      <div className="dropdown">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.value.trim() || !description.value.trim()) {
              return;
            }
            this.props.onCreatePlaylistSubmit(title.value, description.value);
            title.value = '';
            description.value = '';
          }}
        >
          <div>
            <div className="title">Title</div>
            <input type="text" ref={(node) => { title = node; }} />
            <div className="title">Description</div>
            <input type="text" ref={(node) => { description = node; }} />
          </div>
          <button type="submit" className="button green">Create</button>
        </form>
      </div>
    );
  }
};

CreatePlaylist.propTypes = {
  onCreatePlaylistSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
