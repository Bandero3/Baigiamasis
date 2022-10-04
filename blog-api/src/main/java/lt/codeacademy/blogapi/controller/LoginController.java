package lt.codeacademy.blogapi.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.blogapi.ApplicationPath;
import lt.codeacademy.blogapi.dto.Login;
import lt.codeacademy.blogapi.dto.Post;
import lt.codeacademy.blogapi.dto.User;
import lt.codeacademy.blogapi.exception.data.ExceptionResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(ApplicationPath.LOGIN)
@OpenAPIDefinition(tags = {
        @Tag(name = "Login controller", description = "Controller for logging in")
})
public class LoginController {
    @Operation(tags = "Login controller", summary = "User login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in successfully", content = {@Content(schema = @Schema(implementation = Login.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping
    public Login login(@AuthenticationPrincipal User user){
        return new Login(user);
    }
}
