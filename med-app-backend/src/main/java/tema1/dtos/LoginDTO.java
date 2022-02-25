package tema1.dtos;

import java.util.Objects;
import java.util.UUID;

public class LoginDTO {
    private String username;
    private String password;
    private int role;
    private String name;

    public LoginDTO() {
    }


    public LoginDTO(String username, String password, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    public LoginDTO(String username, String password, int role, String name) {
        this.username = username;
        this.password = password;
        this.role=role;
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setNAme(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginDTO loginDTO = (LoginDTO) o;
        return username.equals(loginDTO.username) &&
                Objects.equals(password, loginDTO.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }
}
