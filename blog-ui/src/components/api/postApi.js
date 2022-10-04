import HTTP from "./index";

const getPosts = () => HTTP.get('/posts');
const savePost = (data) => HTTP.post('/posts', data);
const getPost = (postId) => HTTP.get(`/posts/${postId}`);
const deletePost = (postId) => HTTP.delete(`/posts/${postId}`);
const updatePost = (data, postId) => HTTP.put(`/posts/${postId}`, data);
const searchPosts = (string) => HTTP.get("/posts/search", {params: {query: string}});

export {
    getPosts,
    savePost,
    getPost,
    deletePost,
    updatePost,
    searchPosts
};