package tema1.dtos.builders;


import tema1.dtos.*;
import tema1.entities.Caregiver;
import tema1.entities.Login;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;

public class LoginBuilder {

    private LoginBuilder() {
    }

    public static LoginDTO toLoginDTO(Login login) {
        return new LoginDTO(login.getUsername(), login.getPassword(), login.getRole(), login.getName());
    }

    public static Login toEntity(LoginDTO loginDTO) {
        return new Login(loginDTO.getUsername(),loginDTO.getPassword(), loginDTO.getRole(), loginDTO.getName());
    }
}
