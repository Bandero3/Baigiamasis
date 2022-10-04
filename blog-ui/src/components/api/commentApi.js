import HTTP from "./index";

const saveComment = (data, postId) => HTTP.post(`/comments/${postId}`, data);
const getComments = (postId) => HTTP.get(`comments/${postId}`);
const deleteComment = (commentId) => HTTP.delete(`/comments/${commentId}`);

export {
    saveComment,
    getComments,
    deleteComment
}