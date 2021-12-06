import mongoose, { Schema } from 'mongoose';

// create a PostSchema
const TemplateSchema = new Schema({
  title: String,
  tags: [String],
  content: String,
  coverUrl: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  email: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  autoIndex: true,
});
TemplateSchema.index({ title: 'text', tags: 'text', content: 'text' });

// create model class
const TemplateModel = mongoose.model('Template', TemplateSchema);

export default TemplateModel;
