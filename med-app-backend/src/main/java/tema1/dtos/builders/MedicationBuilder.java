package tema1.dtos.builders;


import tema1.dtos.MedicationDTO;
import tema1.entities.Medication;

public class MedicationBuilder {

    private MedicationBuilder() {
    }

    public static MedicationDTO toMedicationDTO(Medication medication) {
        return new MedicationDTO(medication.getId(), medication.getName(), medication.getDosage());
    }

    public static Medication toEntity(MedicationDTO medicationDetailsDTO) {
        return new Medication(medicationDetailsDTO.getId(), medicationDetailsDTO.getName(),medicationDetailsDTO.getDosage());
    }
}
