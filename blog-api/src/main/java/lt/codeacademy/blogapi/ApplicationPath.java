package lt.codeacademy.blogapi;

public interface ApplicationPath {
    String POSTID = "postId";
    String PHOTOID = "photoId";
    String COMMENTID = "commentId";


    String POSTS = "/posts";
    String POST = "/{" + POSTID + "}";
    String SEARCH = "/search";
    String USERS = "/users";
    String PHOTOS = "/photos";
    String PHOTO = "/{" + PHOTOID + "}";
    String LOGIN = "/login";
    String COMMENTS = "/comments";
    String COMMENT = "/{" + COMMENTID + "}";
}
