package tema1.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tema1.dtos.CaregiverDTO;
import tema1.dtos.LoginDTO;
import tema1.entities.Login;
import tema1.services.CaregiverService;
import tema1.services.LoginService;


import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/users")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }


    @GetMapping()
    public ResponseEntity<List<LoginDTO>> getLogins() {
        List<LoginDTO> obj = loginService.findLogins();
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<LoginDTO> getLogin(@RequestBody LoginDTO login) {
        LoginDTO obj = loginService.findLoginByCredentials(login);
        System.out.println("Username: " + obj.getUsername() + " Password: " + obj.getPassword() + " Role: " + obj.getRole());
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<UUID> registerLogin(@RequestBody LoginDTO login) {
        UUID id = loginService.insert(login);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
/*
    @PostMapping()
    public ResponseEntity<String> getLogin(@RequestBody Login username) {
        String obj = loginService.insert(username);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/{username}")
    public ResponseEntity<Login> getLogin(@PathVariable("username") String username, @PathVariable("password") String password) {
        Login obj = loginService.findLoginByCredentials(username, password);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

@GetMapping(value = "/{username}")
public ResponseEntity<String> getLogin(@PathVariable("username") String username) {
    String obj = loginService.findLoginByUsername(username);
    return new ResponseEntity<>(obj, HttpStatus.OK);
}*/
}
