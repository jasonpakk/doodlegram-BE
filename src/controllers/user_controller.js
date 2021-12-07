import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (user) => {
  return tokenForUser(user);
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error('You must provide username, email, and password');
  }

  // See if a user with the given username exists
  let existingUser = await User.findOne({ username });
  if (existingUser) {
    // If a user with username does exist, return an error
    throw new Error('Username is in use');
  }

  // See if a user with the given email exists
  existingUser = await User.findOne({ email });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = password;

  user.name = '';
  user.picture = '';
  user.gender = '';
  user.birthday = '';
  user.home = '';
  user.quote = '';
  user.favoriteShoe = '';
  user.favoriteArtist = '';
  user.favoriteColor = '';

  await user.save();
  return tokenForUser(user);
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const getUsers = async () => {
  try {
    const fetchedUsers = await User.find();
    return fetchedUsers;
  } catch (error) {
    throw new Error(`get users error: ${error}`);
  }
};

export const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`get user error: ${error}`);
  }
};

export const updateUser = async (userId, userField) => {
  try {
    await User.findByIdAndUpdate(userId, userField);
    return 'user updated successfully';
  } catch (error) {
    throw new Error(`update user error: ${error}`);
  }
};

export const deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    return 'user deleted successfully';
  } catch (error) {
    throw new Error(`delete user error: ${error}`);
  }
};
