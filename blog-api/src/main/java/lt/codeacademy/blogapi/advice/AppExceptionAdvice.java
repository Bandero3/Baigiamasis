package lt.codeacademy.blogapi.advice;

import lt.codeacademy.blogapi.exception.PhotoException;
import lt.codeacademy.blogapi.exception.PostDoesntExistException;
import lt.codeacademy.blogapi.exception.data.ExceptionResponse;
import static org.springframework.http.HttpStatus.*;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppExceptionAdvice {

    @ExceptionHandler (PostDoesntExistException.class)
    @ResponseStatus(NOT_FOUND)
    public ExceptionResponse handlePostDoesntExistException(PostDoesntExistException exception){
        return new ExceptionResponse(String.format("Can't find post with id: %s", exception.getPostId()), NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(BAD_REQUEST)
    public ExceptionResponse handleIllegalArgumentException(IllegalArgumentException exception){
        return new ExceptionResponse(exception.getMessage(), BAD_REQUEST);
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    @ResponseStatus(NOT_FOUND)
    public ExceptionResponse handleEmptyDataAccessException(EmptyResultDataAccessException exception){
        return new ExceptionResponse(exception.getMessage(), NOT_FOUND);
    }
    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(BAD_REQUEST)
    public ExceptionResponse handleException(MissingServletRequestParameterException exception){
        return new ExceptionResponse(exception.getMessage(), BAD_REQUEST);
    }

    @ExceptionHandler(PhotoException.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ExceptionResponse handlePhotoException(PhotoException exception){
        return new ExceptionResponse(exception.getMessage(),INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleException(Exception exception){
        return new ExceptionResponse(exception.getMessage(), INTERNAL_SERVER_ERROR);
    }
}
