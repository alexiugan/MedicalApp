package tema1.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tema1.controllers.handlers.exceptions.model.ResourceNotFoundException;
import tema1.dtos.FrontDTO;
import tema1.dtos.MedicationDTO;
import tema1.dtos.PatientDTO;
import tema1.dtos.PatientUpdateDTO;
import tema1.dtos.builders.CaregiverBuilder;
import tema1.dtos.builders.MedicationBuilder;
import tema1.dtos.builders.PatientBuilder;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.Patient;
import tema1.repositories.MedicationRepository;
import tema1.repositories.PatientRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PatientService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PatientService.class);
    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<PatientDTO> findPatients() {
        List<Patient> patientList = patientRepository.findAll();
        return patientList.stream()
                .map(PatientBuilder::toPatientDTO)
                .collect(Collectors.toList());
    }

    public List<PatientDTO> findPatientsByCaregiverId(UUID id){
//        String toSend= "decode(replace('"+id+"'::text, '-', ''), 'hex')";
        List<Patient> patientList = patientRepository.findByCaregiverId(id);
        return patientList.stream()
                .map(PatientBuilder::toPatientDTO)
                .collect(Collectors.toList());
    }

    public PatientDTO findPatientById(UUID id) {
        Optional<Patient> prosumerOptional = patientRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Patient with id {} was not found in db", id);
            throw new ResourceNotFoundException(Patient.class.getSimpleName() + " with id: " + id);
        }
        return PatientBuilder.toPatientDTO(prosumerOptional.get());
    }

    public UUID insert(PatientDTO patientDTO) {
        Patient p = PatientBuilder.toEntity(patientDTO);
        p = patientRepository.save(p);
        LOGGER.debug("Patient with id {} was inserted in db", p.getId());
        return p.getId();
    }

    public PatientDTO findPatientByName(String name){

        Patient p = patientRepository.findByName(name);

        if (p==null) {
            LOGGER.error("Patient with name {} was not found in db", name);
            throw new ResourceNotFoundException(Patient.class.getSimpleName() + " with name: " + name);
        }

        return PatientBuilder.toPatientDTO(p);
    }

    public UUID updatePatient(PatientUpdateDTO patientUpdateDTO)
    {
        Patient toUpdate = patientRepository.findByName(patientUpdateDTO.getOldName());

        if(toUpdate!=null)
        {
            toUpdate.setName(patientUpdateDTO.getNewName());
            toUpdate.setAddress(patientUpdateDTO.getNewAddress());
            toUpdate.setDate(patientUpdateDTO.getNewDate());
            toUpdate.setGender(patientUpdateDTO.getNewGender());
            toUpdate.setCaregiverID(patientUpdateDTO.getNewCaregiverID());
            toUpdate.setMedicalRecord(patientUpdateDTO.getNewMedicalRecord());
            toUpdate.setmedplanid(patientUpdateDTO.getNewMedplanid());
            patientRepository.save(toUpdate);
        }
        return toUpdate.getId();
    }

    public void deletePatientById(UUID id)
    {
        patientRepository.deleteById(id);
    }

    public void deletePatientByName(String name)
    {
        patientRepository.deletePatientByName(name);
    }

}
