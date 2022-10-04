package lt.codeacademy.blogapi.controller;

import static lt.codeacademy.blogapi.ApplicationPath.*;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.blogapi.dto.Post;
import lt.codeacademy.blogapi.dto.User;
import lt.codeacademy.blogapi.exception.data.ExceptionResponse;
import lt.codeacademy.blogapi.service.PostService;
import static org.springframework.http.MediaType.*;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(POSTS)
@OpenAPIDefinition(tags = {
        @Tag(name = "Post controller", description = "Travel blog post controller")
})
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @Operation(tags = "Post controller", summary = "Get all posts")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All posts returned successfully", content = {@Content(schema = @Schema(implementation = Post.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public List<Post> getPosts(){
        return postService.getPosts();
    }

    @Operation(tags = "Post controller", summary = "Get a single post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post returned successfully", content = {@Content(schema = @Schema(implementation = Post.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = POST, produces = APPLICATION_JSON_VALUE)
    public Post getPost (@PathVariable(POSTID) UUID id){
        return postService.getPost(id);
    }

    @Operation(tags = "Post controller", summary = "Create a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Post created successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public void createPost(@RequestBody Post post, @AuthenticationPrincipal String username){
        post.setUsername(username);
        postService.createPost(post);
    }

    @Operation(tags = "Post controller", summary = "Update a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Post updated successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PutMapping(value = POST, consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(ACCEPTED)
    public void updatePost(@RequestBody Post post, @PathVariable(POSTID) UUID id, @AuthenticationPrincipal String username){
        post.setId(id);
        post.setUsername(username);
        postService.updatePost(post);
    }

    @Operation(tags = "Post controller", summary = "Delete a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Post deleted successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @DeleteMapping(value = POST)
    @ResponseStatus(NO_CONTENT)
    public void deletePost(@PathVariable(POSTID) UUID id){
        postService.deletePost(id);
    }


    @Operation(tags = "Post controller", summary = "Get all searched posts")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All searched posts returned successfully", content = {@Content(schema = @Schema(implementation = Post.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = SEARCH, produces = APPLICATION_JSON_VALUE)
    public List<Post> search(@RequestParam String query){
        return postService.search(query);
    }
}
