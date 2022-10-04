package lt.codeacademy.blogapi.repository;

import lt.codeacademy.blogapi.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, UUID> {

    List<PostEntity> findByTitleLikeOrDescriptionLike(String title, String content);

}
