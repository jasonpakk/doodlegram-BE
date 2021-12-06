import Post from '../models/post_model';

export const createPost = async (postFields, user) => {
  const post = new Post();
  post.title = postFields.title;
  post.tags = postFields.tags.split(' ');
  post.content = postFields.content;
  post.coverUrl = postFields.coverUrl;
  post.author = user;
  try {
    const savedpost = await post.save();
    return savedpost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};
export const getPosts = async () => {
  try {
    const fetchedPosts = await Post.find({}, { content: 0 }, { sort: { created_at: -1 } });
    return fetchedPosts;
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }
};
export const getPost = async (id) => {
  try {
    const fetchedPost = await Post.findById(id).populate('author');
    return fetchedPost;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
};
export const deletePost = async (id) => {
  try {
    await Post.findByIdAndRemove(id);
    return 'delete success';
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
};
export const updatePost = async (id, postFields) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, postFields, { new: true });
    return updatedPost;
  } catch (error) {
    throw new Error(`update post error: ${error}`);
  }
};
