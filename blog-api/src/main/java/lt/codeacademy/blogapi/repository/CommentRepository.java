package lt.codeacademy.blogapi.repository;

import lt.codeacademy.blogapi.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, UUID> {

    List <CommentEntity> getCommentEntitiesByPostEntityId(UUID id);
}
