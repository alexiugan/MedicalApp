package tema1.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tema1.controllers.handlers.exceptions.model.ResourceNotFoundException;
import tema1.dtos.CaregiverDTO;
import tema1.dtos.LoginDTO;
import tema1.dtos.builders.CaregiverBuilder;
import tema1.dtos.builders.LoginBuilder;
import tema1.entities.Caregiver;
import tema1.entities.Login;
import tema1.repositories.CaregiverRepository;
import tema1.repositories.LoginRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LoginService {
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginService.class);
    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }


    public List<LoginDTO> findLogins() {
        List<Login> loginList = loginRepository.findAll();
        return loginList.stream()
                .map(LoginBuilder::toLoginDTO)
                .collect(Collectors.toList());}

    public LoginDTO findLoginByCredentials(LoginDTO login) {
        Optional<Login> prosumerOptional = loginRepository.findByCredentials(login.getUsername(), login.getPassword());
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Invalid username or password");
            throw new ResourceNotFoundException(Login.class.getSimpleName() + " with username: " + login.getUsername());
        }
        return LoginBuilder.toLoginDTO(prosumerOptional.get());
    }

    public String findLoginByUsername(String username) {
        Login prosumerOptional = loginRepository.findByUsername(username);
        System.out.println(prosumerOptional);
        System.out.println(username);
        if (prosumerOptional==null) {
            LOGGER.error("Invalid username or password");
            throw new ResourceNotFoundException(Login.class.getSimpleName() + " with username: " + username);
        }
        return username;
    }

    public UUID insert(LoginDTO loginDTO) {
        Login login = LoginBuilder.toEntity(loginDTO);
        login = loginRepository.save(login);
        LOGGER.debug("Login with username {} was inserted in db", login.getUsername());
        return login.getId();
    }

}
