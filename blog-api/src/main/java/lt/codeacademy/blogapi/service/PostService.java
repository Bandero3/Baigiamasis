package lt.codeacademy.blogapi.service;

import lt.codeacademy.blogapi.dto.Post;
import lt.codeacademy.blogapi.dto.User;
import lt.codeacademy.blogapi.entity.PostEntity;
import lt.codeacademy.blogapi.exception.PostDoesntExistException;
import lt.codeacademy.blogapi.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public void createPost(Post post){
        post.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
//        post.setUser(user);
        postRepository.save(PostEntity.convert(post));
    }

    public List<Post> getPosts(){
        return postRepository.findAll()
                .stream()
                .map(Post::convert)
                .toList();
    }

    public Post getPost(UUID id){
        return postRepository.findById(id)
                .map(Post::convert)
                .orElseThrow(() -> new PostDoesntExistException(id));
    }

    public void updatePost(Post post){
        post.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        postRepository.save(PostEntity.convert(post));
    }

    public void deletePost(UUID id){
        postRepository.deleteById(id);
    }

    public List<Post> search(String query) {

        query = "%" +query + "%";

        return postRepository.findByTitleLikeOrDescriptionLike(query, query)
                .stream()
                .map(Post::convert)
                .toList();
    }
}
