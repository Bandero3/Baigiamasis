package lt.codeacademy.blogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.blogapi.entity.PostEntity;

import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private UUID id;
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotBlank
    private String content;
    @NotBlank
    private String image;
    @NotBlank
    private String date;
    @NotBlank
    private String username;


    public static Post convert (PostEntity entity){
        return new Post(entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getContent(),
                entity.getImage(),
                entity.getDate(),
                entity.getUsername());
    }
}
