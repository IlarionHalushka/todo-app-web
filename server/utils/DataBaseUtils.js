import mongoose from "mongoose";
import config from "./../etc/config.json";
import "../models/Note";

const Note = mongoose.model("Note");

exports.setUpConnection = () => {
  mongoose.connect(
    `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
  );
};

exports.listNotes = () => {
  return Note.find();
};

exports.createNote = data => {
  const note = new Note({
    title: data.title,
    text: data.text,
    color: data.color,
    picture: data.picture,
    createdAt: new Date()
  });

  return note.save();
};

exports.updateNote = (id, data) => {
  const note = new Note({
    title: data.title,
    text: data.text,
    color: data.color,
    picture: data.picture,
    createdAt: new Date()
  });

  return Note.update({ _id: id }, data);
};

exports.deleteNote = id => {
  return Note.findById(id).remove();
};
