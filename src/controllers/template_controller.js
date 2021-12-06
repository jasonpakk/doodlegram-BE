import Template from '../models/template';

export const createTemplate = async (postFields) => {
  // await creating a post
  // return post
};
export const getTemplates = async () => {
  try {
    /* Filtering content copied from:
    https://cs52-dartmouth.slack.com/archives/C58GBQM4H/p1494465190605925
    */
    const fetchedPosts = await Template.find({}, { content: 0 }, { sort: { created_at: -1 } });
    return fetchedPosts;
  } catch (error) {
    throw new Error(`get templates error: ${error}`);
  }
};
export const getTemplate = async (id) => {
  // await finding one post
  // return post
};
export const deleteTemplate = async (id) => {
  // await deleting a post
  // return confirmation
};
export const updateTemplate = async (id, postFields) => {
  // await updating a post by id
  // return *updated* post
};
