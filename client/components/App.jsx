import React from 'react';

import NotesStore from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';
import uploads from './../helpers/uploads'

function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        notes: NotesStore.getNotes()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        NotesActions.loadNotes();
    },

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    },

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    },

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    },

    handlePictureAdd(pictureData) {
      console.log('pictureData __ handlePictureAdd');
      console.log(pictureData);
        NotesActions.uploadPicture(pictureData)
          .then(res => {
            uploads.single.name = res.data;
          });
    },

    handlePictureUpdate(note) {
      console.log('pictureData __ handlePictureUpdate');
      console.log(note);
      NotesActions.updatePicture(note)
        .then(res => {
          console.log('resDATA', res.data);
          uploads.single.name = res.data;
        });
    },

    handleNoteUpdate(note, data) {
        NotesActions.updateNote(note.id, data);
    },

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>To Do List</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} onPictureAdd={this.handlePictureAdd}/>
                <NotesGrid notes={this.state.notes}
                           onNoteDelete={this.handleNoteDelete}
                            onNoteUpdate={this.handleNoteUpdate}
                           onPictureAdd={this.handlePictureUpdate}
                />
                
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
