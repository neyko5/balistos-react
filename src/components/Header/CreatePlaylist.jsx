import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import Input from '../common/Input';
import Button from '../common/Button';

const LabelTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #3e414c;
  float: left;
  line-height: 24px;
`

const Label = styled.label`
  margin-bottom: 5px;
  margin-right: 20px;
  width: 100%;
  float: left;
  padding-bottom: 5px;
`

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
          <Label htmlFor="title">
            <LabelTitle>Title</LabelTitle>
            <Input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
          </Label>
          <Label htmlFor="description">
            <LabelTitle>Description</LabelTitle>
            <Input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </Label>
          <Button type="submit" green>Create</Button>
        </form>
      </Dropdown>
    );
  }
}

CreatePlaylist.propTypes = {
  onCreatePlaylistSubmit: PropTypes.func.isRequired,
};

export default CreatePlaylist;
