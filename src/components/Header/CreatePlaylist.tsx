// @flow

import React, { FormEvent } from "react";
import styled from "styled-components";

import Button from "../common/Button";
import Input from "../common/Input";
import Dropdown from "./Dropdown";

const LabelTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #3e414c;
  float: left;
  line-height: 24px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  margin-right: 20px;
  width: 100%;
  float: left;
  padding-bottom: 5px;
`;

interface Props {
  onCreatePlaylistSubmit: (title: string, description: string) => void;
}

interface State {
  title: string;
  description: string;
}

class CreatePlaylist extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      description: "",
      title: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: FormEvent<HTMLFormElement>) {
    const update: any = {};
    const target = event.target as HTMLInputElement;
    update[target.name] = target.value;
    this.setState(update);
  }

  public handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!this.state.title.trim() || !this.state.description.trim()) {
      return;
    }
    this.props.onCreatePlaylistSubmit(this.state.title, this.state.description);
    this.setState({
      title: "",
      description: "",
    });
  }

  public render() {
    return (
      <Dropdown>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="title">
            <LabelTitle>Title</LabelTitle>
            <Input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
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
          <Button type="submit" green={true}>Create</Button>
        </form>
      </Dropdown>
    );
  }
}

export default CreatePlaylist;
