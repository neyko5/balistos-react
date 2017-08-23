import React from 'react';
import PropTypes from 'prop-types';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.title.trim() || !this.state.description.trim()) {
      return;
    }
    this.props.onCreatePlaylistSubmit(this.state.title, this.state.description);
    this.setState({
      title: '',
      description: '',
    });
  }

  render() {
    return (
      <div className="dropdown" role="presentation" onClick={event => event.stopPropagation()} >
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="title">Title</div>
            <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
            <div className="title">Description</div>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>
          <button type="submit" className="button green">Create</button>
        </form>
      </div>
    );
  }
}

CreatePlaylist.propTypes = {
  onCreatePlaylistSubmit: PropTypes.func.isRequired,
};

export default CreatePlaylist;
