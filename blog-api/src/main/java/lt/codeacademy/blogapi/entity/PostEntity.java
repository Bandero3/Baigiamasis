package lt.codeacademy.blogapi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.blogapi.dto.Post;
import lt.codeacademy.blogapi.dto.User;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class PostEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    private String title;
    private String description;
    private String content;
    private String image;
    private String date;
    private String username;

    @OneToMany(mappedBy = "postEntity", cascade = CascadeType.ALL)
    private List<CommentEntity> comments;

    public PostEntity(UUID id, String title, String description, String content, String image, String date, String username) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.image = image;
        this.date = date;
        this.username = username;
    }

    public static PostEntity convert(Post p){
        return new PostEntity(p.getId(),
                p.getTitle(),
                p.getDescription(),
                p.getContent(),
                p.getImage(),
                p.getDate(),
                p.getUsername());
    }
}
