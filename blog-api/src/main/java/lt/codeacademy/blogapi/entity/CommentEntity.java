package lt.codeacademy.blogapi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.blogapi.dto.Comment;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class CommentEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    private String comment;
    private String date;
    private String username;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private PostEntity postEntity;

    public static CommentEntity convert(Comment c){
        PostEntity postEntity = PostEntity.convert(c.getPost());
        return new CommentEntity(c.getId(),
                c.getComment(),
                c.getDate(),
                c.getUsername(),
                postEntity);
    }
}
