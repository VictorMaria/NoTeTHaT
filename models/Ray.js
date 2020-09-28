import mongoose from 'mongoose';

const { Schema } = mongoose;

const RaySchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
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
}, { timestamps: true });
RaySchema.index({ createdAt: 1 }, { expires: '24h' });
const Ray = mongoose.model('Ray', RaySchema);

export default Ray;