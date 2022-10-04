package lt.codeacademy.blogapi.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name ="photos")
public class PhotoEntity {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    private String name;
    private String mediaType;
    private long size;
    @CreationTimestamp
    private LocalDateTime timestamp;


    public PhotoEntity(String name, String mediaType, long size) {
        this.name = name;
        this.mediaType = mediaType;
        this.size = size;
    }
}
