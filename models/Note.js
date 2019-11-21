import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  geoTag: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    city: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Note = mongoose.model('notes', NoteSchema);

export default Note;
