import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown/Dropdown';
import Input from '../../common/Input';
import Button from '../../common/Button';

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
      <Dropdown>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <Input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
            <label>Description</label>
            <Input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>
          <Button type="submit" className="button green">Create</Button>
        </form>
      </Dropdown>
    );
  }
}

CreatePlaylist.propTypes = {
  onCreatePlaylistSubmit: PropTypes.func.isRequired,
};

export default CreatePlaylist;
