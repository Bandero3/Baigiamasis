package lt.codeacademy.blogapi.service;

import lt.codeacademy.blogapi.dto.Photo;
import lt.codeacademy.blogapi.entity.PhotoEntity;
import lt.codeacademy.blogapi.exception.PhotoException;
import lt.codeacademy.blogapi.repository.PhotoRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class PhotoService {

    private static final long MAX_PHOTO_SIZE = 10000000;
    private static final Set<String> ALLOWED_PHOTO_TYPES = Set.of(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE);
    private final Path location;
    private final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
        location = Paths.get("./files").toAbsolutePath().normalize();
        createDirectory();

    }

    public void savePhoto(MultipartFile multipartFile){
        validatePhoto(multipartFile);

        try{
            PhotoEntity photo = new PhotoEntity(multipartFile.getOriginalFilename(), multipartFile.getContentType(), multipartFile.getSize());
            photoRepository.save(photo);

            Path path = location.resolve(photo.getId().toString());
            Files.copy(multipartFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        }catch (IOException e){
            throw new PhotoException("Can't save file");
        }
    }

    public Photo downloadPhoto(UUID id) throws FileNotFoundException {
        PhotoEntity entity = photoRepository.findById(id)
                .orElseThrow(() -> new FileNotFoundException(String.format("Photo with id %S does not exist", id)));

        try{
            Path path = location.resolve(entity.getId().toString());
            InputStream inputStream = Files.newInputStream(path);

            return Photo.convert(entity, inputStream);

        } catch (IOException e){
            throw new FileNotFoundException(String.format("Photo entity with id %s does not exist", id));
        }
    }

    private void createDirectory(){
        try{
            if(!Files.exists(location)){
                Files.createDirectory(location);
            }
        } catch (IOException e){
            throw new PhotoException("Can't create directory");
        }
    }

    private void validatePhoto(MultipartFile multipartFile){
        if(multipartFile.getSize() > MAX_PHOTO_SIZE){
            throw new PhotoException(String.format("Photo size is to large %s, it needs to be less than %s Bytes", multipartFile.getSize(), MAX_PHOTO_SIZE));
        }
        if(!ALLOWED_PHOTO_TYPES.contains(multipartFile.getContentType())){
            throw new PhotoException(String.format("Photo type %s is not allowed", multipartFile.getContentType()));
        }
    }
}
