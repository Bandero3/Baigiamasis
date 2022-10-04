package lt.codeacademy.blogapi.controller;

import static lt.codeacademy.blogapi.ApplicationPath.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.blogapi.dto.Comment;
import lt.codeacademy.blogapi.dto.Post;
import lt.codeacademy.blogapi.exception.data.ExceptionResponse;
import lt.codeacademy.blogapi.service.CommentService;
import lt.codeacademy.blogapi.service.PostService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(COMMENTS)
@OpenAPIDefinition(tags = {
        @Tag(name = "Comment controller", description = "Travel blog comment controller")
})
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;

    public CommentController(CommentService commentService, PostService postService) {
        this.commentService = commentService;
        this.postService = postService;
    }

    @Operation(tags = "Comment controller", summary = "Create a comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Comment created successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping(value = POST, consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public void createComment(@RequestBody Comment comment, @AuthenticationPrincipal String username, @PathVariable(POSTID) UUID id){
        comment.setUsername(username);
        comment.setPost(postService.getPost(id));
        commentService.createComment(comment);
    }


    @Operation(tags = "Comment controller", summary = "Get comments under post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All post comments returned successfully", content = {@Content(schema = @Schema(implementation = Comment.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = POST, produces = APPLICATION_JSON_VALUE)
    public List<Comment> getComments(@PathVariable(POSTID) UUID id){
        return commentService.getComments(id);
    }

    @Operation(tags = "Comment controller", summary = "Delete a comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Comment deleted successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @DeleteMapping(value = COMMENT)
    @ResponseStatus(NO_CONTENT)
    public void deleteComment(@PathVariable(COMMENTID) UUID id){
        commentService.deleteComment(id);
    }
}
