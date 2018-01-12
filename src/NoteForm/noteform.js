import React, { Component } from 'react';
import './noteform.css';
import PropTypes from 'prop-types';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: '',
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      newNoteContent: e.target.value,
    });
  }

  writeNote() {
    this.props.addNote(this.state.newNoteContent);
    this.setState({
      newNoteContent: '',
    });
  }

  render() {
    return(
      <div className="form-wrapper">
        <input className="note-input" placeholder="Write a new note" type="text" value={this.state.newNoteContent}
        onChange={this.handleUserInput} />
        <button className="note-button"
        onClick={this.writeNote}>Add Note</button>
      </div>
    )
  }
}

export default NoteForm;
