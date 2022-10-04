package lt.codeacademy.blogapi.exception;

import java.util.UUID;

public class PostDoesntExistException extends RuntimeException{

    private final UUID postId;

    public PostDoesntExistException(UUID postId){
        this.postId = postId;
    }

    public UUID getPostId(){
        return postId;
    }
}
