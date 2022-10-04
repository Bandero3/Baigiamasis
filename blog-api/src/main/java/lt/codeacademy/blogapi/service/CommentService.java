package lt.codeacademy.blogapi.service;

import lt.codeacademy.blogapi.dto.Comment;
import lt.codeacademy.blogapi.dto.Post;
import lt.codeacademy.blogapi.entity.CommentEntity;
import lt.codeacademy.blogapi.entity.PostEntity;
import lt.codeacademy.blogapi.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void createComment(Comment comment){
        comment.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        commentRepository.save(CommentEntity.convert(comment));
    }

    public List<Comment> getComments(UUID id){
        return commentRepository.getCommentEntitiesByPostEntityId(id)
                .stream()
                .map(Comment::convert)
                .toList();
    }

    public void deleteComment(UUID id){
        commentRepository.deleteById(id);
    }

}
