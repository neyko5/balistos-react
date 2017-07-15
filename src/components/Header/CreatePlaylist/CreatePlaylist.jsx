import React from 'react';
import PropTypes from 'prop-types';

const CreatePlaylist = (props) => {
  let title;
  let description;
  return (
    <div className="dropdown" >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.value.trim() || !description.value.trim()) {
            return;
          }
          props.onCreatePlaylistSubmit(title.value, description.value);
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
};

CreatePlaylist.propTypes = {
  onCreatePlaylistSubmit: PropTypes.func.isRequired
};

module.exports = CreatePlaylist;
