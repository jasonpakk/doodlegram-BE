import Doodle from '../models/doodle_model';

export const createDoodle = async (doodleFields, user) => {
  const doodle = new Doodle();
  doodle.doodle = doodleFields.url;
  doodle.author = user;
  // TO DO -> add to users list of doodles
  try {
    const saveddoodle = await doodle.save();
    return saveddoodle;
  } catch (error) {
    throw new Error(`create doodle error: ${error}`);
  }
};
export const getDoodles = async () => {
  try {
    const fetchedDoodles = await Doodle.find();
    return fetchedDoodles;
  } catch (error) {
    throw new Error(`get doodles error: ${error}`);
  }
};
export const getDoodle = async (id) => {
  try {
    const fetchedDoodle = await Doodle.findById(id).populate('author');
    return fetchedDoodle;
  } catch (error) {
    throw new Error(`get doodle error: ${error}`);
  }
};
export const deleteDoodle = async (id) => {
  try {
    await Doodle.findByIdAndRemove(id);
    return 'delete success';
  } catch (error) {
    throw new Error(`delete doodle error: ${error}`);
  }
};
export const updateDoodle = async (id, doodleFields) => {
  try {
    const updatedDoodle = await Doodle.findByIdAndUpdate(id, doodleFields, { new: true });
    return updatedDoodle;
  } catch (error) {
    throw new Error(`update doodle error: ${error}`);
  }
};
