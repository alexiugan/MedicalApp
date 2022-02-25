package tema1.dtos.builders;


import tema1.dtos.MedicationDTO;
import tema1.dtos.PatientDTO;
import tema1.entities.Medication;
import tema1.entities.Patient;

public class PatientBuilder {

    private PatientBuilder() {
    }

    public static PatientDTO toPatientDTO(Patient patient) {
        return new PatientDTO(patient.getId(), patient.getName(), patient.getDate(), patient.getGender(), patient.getAddress(), patient.getMedicalRecord(), patient.getCaregiverID(), patient.getmedplanid());
    }

    public static Patient toEntity(PatientDTO patientDTO) {
        return new Patient(patientDTO.getId(), patientDTO.getName(), patientDTO.getAddress(), patientDTO.getDate(), patientDTO.getGender(), patientDTO.getMedicalRecord(), patientDTO.getCaregiverid(), patientDTO.getMedplanid());
    }
}
