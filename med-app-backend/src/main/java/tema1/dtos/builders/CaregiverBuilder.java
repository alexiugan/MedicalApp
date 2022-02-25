package tema1.dtos.builders;


import tema1.dtos.CaregiverDTO;
import tema1.entities.Caregiver;

public class CaregiverBuilder {

    private CaregiverBuilder() {
    }

    public static CaregiverDTO toCaregiverDTO(Caregiver caregiver) {
        return new CaregiverDTO(caregiver.getId(), caregiver.getName(), caregiver.getDate(), caregiver.getGender(), caregiver.getAddress());
    }

    public static Caregiver toEntity(CaregiverDTO caregiverDetailsDTO) {
        return new Caregiver(caregiverDetailsDTO.getId(), caregiverDetailsDTO.getName(),caregiverDetailsDTO.getDate(),
                caregiverDetailsDTO.getGender(), caregiverDetailsDTO.getAddress());

    }
}
