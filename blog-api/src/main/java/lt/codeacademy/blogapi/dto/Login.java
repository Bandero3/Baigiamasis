package lt.codeacademy.blogapi.dto;

import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class Login {
    private final String username;
    private final String fullName;
    private final List<String> roles;

    public Login(User user) {
        this.username = user.getUsername();
        this.fullName = user.getFullName();
        this.roles = user.getRoles().stream().map(Role::getName).toList();
    }
}
