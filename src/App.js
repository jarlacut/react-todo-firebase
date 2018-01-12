import React, { Component } from 'react';
import Note from './Note/note';
import NoteForm from './NoteForm/noteform';
import { DB_CONFIG } from './Config/config';
import * as firebase from 'firebase';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');

    this.state = {
      notes: [],
    }
  }

  componentWillMount() {
    const previousNotes = this.state.notes;

    this.db.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      });

      this.setState({
        notes: previousNotes
      });
    });

    this.db.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++) {
        if(previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      });
    });
  }

  addNote(note) {
    this.db.push().set({ noteContent: note });
  }

  removeNote(noteId) {
    this.db.child(noteId).remove();
  }

  render() {
    return (
      <div className="notes-wrapper">
        <div className="notes-header">
          <h1>React & Firebase To-Do List</h1>
        </div>
        <div className="notes-body">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote} />
              )
            })
          }
        </div>
        <div className="notes-footer">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App;
