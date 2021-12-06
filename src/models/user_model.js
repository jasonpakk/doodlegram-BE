import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a UserSchema
const UserSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },

  name: { type: String },
  year: { type: String },
  picture: { type: String },
  gender: { type: String },
  race: { type: String },
  major: { type: String },
  minor: { type: String },
  modification: { type: String },
  birthday: { type: String },
  role: { type: String },
  home: { type: String },
  quote: { type: String },
  favoriteShoe: { type: String },
  favoriteArtist: { type: String },
  favoriteColor: { type: String },
  phoneType: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true, transform: true },
  timestamps: true,
});

UserSchema.pre('save', async function beforeYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
