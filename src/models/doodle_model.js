import mongoose, { Schema } from 'mongoose';

// create a PostSchema
const DoodleSchema = new Schema({
  doodle: {
    data: Buffer,
    contentType: String,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const DoodleModel = mongoose.model('Doodle', DoodleSchema);

export default DoodleModel;
