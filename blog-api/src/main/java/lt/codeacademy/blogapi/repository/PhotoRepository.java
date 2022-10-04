package lt.codeacademy.blogapi.repository;

import lt.codeacademy.blogapi.entity.PhotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PhotoRepository extends JpaRepository<PhotoEntity, UUID> {

}
