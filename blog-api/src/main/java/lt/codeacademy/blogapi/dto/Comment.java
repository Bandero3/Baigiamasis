package lt.codeacademy.blogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.blogapi.entity.CommentEntity;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private UUID id;
    @NotBlank
    private String comment;
    @NotBlank
    private String date;
    @NotBlank
    private String username;
    private Post post;

    public static Comment convert(CommentEntity entity){
        Post post = Post.convert(entity.getPostEntity());
        return new Comment(entity.getId(),
                entity.getComment(),
                entity.getDate(),
                entity.getUsername(),
                post);
    }

}
