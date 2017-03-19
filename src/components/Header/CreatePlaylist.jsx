import React from 'react';
let CreatePlaylist = (props) => {
    let title
    let description
    return (
        <div className={"dropdown " + (props.open ? '':'hidden')} id="create"  >
            <form onSubmit={e => {
                e.preventDefault()
                if (!title.value.trim() || !description.value.trim) {
                  return
                }
                props.onCreatePlaylistSubmit(title.value, description.value);
                title.value = ''
                description.value = ''
              }}>
                <label>
                    <div className="title">Title</div>
                    <div className="error" id="create-playlist-error"></div>
                    <input type="text" id="playlist-title" ref={node => { title = node }} />
                    <div className="title">Description</div>
                    <input type="text" id="playlist-title" ref={node => { description = node }}/>
                </label>
                <button type="submit" className="button green">Create</button>
            </form>
        </div>
    );
}

module.exports = CreatePlaylist;
