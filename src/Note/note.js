import React, { Component } from 'react';
import './note.css';
import PropTypes from 'prop-types';

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  render() {
    return (
      <div className="note">
        <div className="noteContent">
          <p className="noteText">{ this.noteContent }</p>
          <button className="btnDeleteNote" onClick={() => this.handleRemoveNote(this.noteId)}>Delete</button>
        </div>
      </div>
    )
  }
}

Note.PropTypes = {
  noteContent: PropTypes.string
}

export default Note;
