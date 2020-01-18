import mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
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
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  idempotencyKey: {
    type: String,
    required: true,
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
