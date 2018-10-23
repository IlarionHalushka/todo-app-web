import React from 'react';

import './Note.less';
import PictureUploader from './PictureUploader.jsx';

import "babel-polyfill";

import $ from 'jquery';
import _ from 'lodash';
import uploads from "../helpers/uploads";

const Note = React.createClass({
    getInitialState() {
        return {
            title: this.props.title,
            text: this.props.children,
            id: this.props.id,
            color: this.props.color,
            picture: this.props.picture
        };
    },

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    },

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },

    handlePictureChange(event) {
      this.props.onPictureAdd(event);
    },

    handleEditIcon(event) {
      $(event.target).siblings('.Note__button').slideToggle();
      $(event.target).siblings('.fileUploader').toggle();
      let noteTitle = $(event.target).siblings('form').children('.Note__title');
      let noteText = $(event.target).siblings('form').children('.Note__text');
      noteTitle.prop('disabled', function (_, val) { return ! val; });
      noteText.prop('disabled', function (_, val) { return ! val; });

      noteTitle.css('border') == '1px solid rgb(211, 211, 211)' ?
        noteTitle.css('border', '3px solid #d3d3d3')
        : noteTitle.css('border', '1px solid #d3d3d3');

      noteText.css('border') == '1px solid rgb(211, 211, 211)' ?
        noteText.css('border', '3px solid #d3d3d3')
        : noteText.css('border', '1px solid #d3d3d3');
    },

  handleCancelButton(event) {
    $(event.target).slideToggle();
    $(event.target).siblings('.Note__button').slideToggle();
    $(event.target).siblings('.fileUploader').toggle();
    let noteTitle = $(event.target).siblings('form').children('.Note__title');
    let noteText = $(event.target).siblings('form').children('.Note__text');
    noteTitle.prop('disabled', function (_, val) { return ! val; });
    noteText.prop('disabled', function (_, val) { return ! val; });

    noteTitle.css('border') == '1px solid rgb(211, 211, 211)' ?
      noteTitle.css('border', '3px solid #d3d3d3')
      : noteTitle.css('border', '1px solid #d3d3d3');

    noteText.css('border') == '1px solid rgb(211, 211, 211)' ?
      noteText.css('border', '3px solid #d3d3d3')
      : noteText.css('border', '1px solid #d3d3d3');
  },

    handleSaveButton(event) {
      let picture = _.find(uploads, {noteID: this.state.id});
      let pictureName = picture ? picture.name : this.state.picture;

      this.setState({ picture: pictureName}, async() => {
        let res = await this.props.onUpdate.bind(null, this.state)();
      });
      $(event.target).siblings('.fileUploader').toggle();
      $(event.target).siblings('#cancelNoteEditBtn').slideToggle();
      $(event.target).slideToggle();

      let noteTitle = $(event.target).siblings('form').children('.Note__title');
      let noteText = $(event.target).siblings('form').children('.Note__text');
      noteTitle.prop('disabled', function (_, val) { return ! val; });
      noteText.prop('disabled', function (_, val) { return ! val; });

      noteTitle.css('border') == '1px solid rgb(211, 211, 211)' ?
        noteTitle.css('border', '3px solid #d3d3d3')
        : noteTitle.css('border', '1px solid #d3d3d3');

      noteText.css('border') == '1px solid rgb(211, 211, 211)' ?
        noteText.css('border', '3px solid #d3d3d3')
        : noteText.css('border', '1px solid #d3d3d3');
    },

    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Note' style={style}>
                <span className='Note__del-icon' onClick={this.props.onDelete}> × </span>
                <span className='Note__update-icon' onClick={this.handleEditIcon}> ✎ </span>
                {
                    this.state.title
                    ?
                        <form>
                            <label className='Note__label'>Title: </label>
                            <input className='Note__title' disabled='true' value={this.state.title} onChange={this.handleTitleChange}/>
                        </form>
                    :
                        null
                }

                <form>
                    <div className='Note__label'>Text: </div>
                    <textarea rows='3' className='Note__text' disabled value={this.state.text} onChange={this.handleTextChange}/>
                </form>
              {
                this.props.picture
                  ?
                  <div>
                    <div className='Note__label'>Picture: </div>
                    <a href={`https://todo-back-end.appspot.com/upload/${this.props.picture}`} target="_blank">
                      <img src={`https://todo-back-end.appspot.com/upload/${this.props.picture}`}
                           className='Note__image'
                      />
                    </a>

                  </div>
                  :
                  null
              }

              <PictureUploader
                onPictureAdd={this.handlePictureChange}
              />
              <button id='saveNoteBtn' className='Note__save-button Note__button' onClick={this.handleSaveButton}> Save </button>
              <button id='cancelNoteEditBtn' className='Note__cancel-button Note__button' onClick={this.handleCancelButton}> Cancel </button>
            </div>
        );
    }
});

export default Note;
