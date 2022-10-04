package lt.codeacademy.blogapi.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.blogapi.dto.User;
import lt.codeacademy.blogapi.exception.data.ExceptionResponse;
import lt.codeacademy.blogapi.service.UserService;
import org.springframework.web.bind.annotation.*;

import static lt.codeacademy.blogapi.ApplicationPath.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(USERS)
@OpenAPIDefinition(tags = {
        @Tag(name = "User controller", description = "Application user controller")
})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(tags = "User controller", summary = "Create a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public void createPost(@RequestBody User user){
        userService.createUser(user);
    }
}
