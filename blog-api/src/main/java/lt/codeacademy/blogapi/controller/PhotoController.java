package lt.codeacademy.blogapi.controller;

import static lt.codeacademy.blogapi.ApplicationPath.*;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.blogapi.dto.Photo;
import lt.codeacademy.blogapi.exception.data.ExceptionResponse;
import lt.codeacademy.blogapi.service.PhotoService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.FileNotFoundException;
import java.util.UUID;

@RestController
@RequestMapping(PHOTOS)
@OpenAPIDefinition(tags = {
        @Tag(name = "Photo controller", description = "Upload and download photos")
})
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @Operation(tags = "Photo controller", summary = "Save photo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Photo saved successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping
    public void savePhoto(@RequestParam MultipartFile multipartFile){
        photoService.savePhoto(multipartFile);
    }


    @Operation(tags = "Photo controller", summary = "Download photo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Photo downloaded successfully", content = {@Content(schema = @Schema(implementation = Resource.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(PHOTO)
    public ResponseEntity<Resource> downloadFile(@PathVariable(PHOTOID) UUID id) throws FileNotFoundException {
        Photo photo = photoService.downloadPhoto(id);

        Resource resource = new InputStreamResource(photo.getInputStream());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Disposition", "attachment; filename=\"" + photo.getName() + "\"");

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(photo.getMediaType()))
                .headers(headers)
                .body(resource);
    }
}
