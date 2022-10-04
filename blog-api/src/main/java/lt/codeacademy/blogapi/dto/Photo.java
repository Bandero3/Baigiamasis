package lt.codeacademy.blogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lt.codeacademy.blogapi.entity.PhotoEntity;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor

public class Photo {
    private UUID id;
    private String name;
    private String mediaType;
    private long size;
    private LocalDateTime timestamp;
    private InputStream inputStream;

    public static Photo convert(PhotoEntity entity, InputStream inputStream){
        return new Photo(entity.getId(),
                entity.getName(),
                entity.getMediaType(),
                entity.getSize(),
                entity.getTimestamp(),
                inputStream);
    }

}
