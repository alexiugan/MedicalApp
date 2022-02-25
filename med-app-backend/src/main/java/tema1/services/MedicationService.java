package tema1.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tema1.controllers.handlers.exceptions.model.ResourceNotFoundException;
import tema1.dtos.CaregiverDTO;
import tema1.dtos.MedicationDTO;
import tema1.dtos.MedicationUpdateDTO;
import tema1.dtos.builders.CaregiverBuilder;
import tema1.dtos.builders.MedicationBuilder;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.repositories.MedicationRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MedicationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MedicationService.class);
    private final MedicationRepository medicationRepository;

    @Autowired
    public MedicationService(MedicationRepository medicationRepository) {
        this.medicationRepository = medicationRepository;
    }

    public List<MedicationDTO> findMedications() {
        List<Medication> medicationList = medicationRepository.findAll();
        return medicationList.stream()
                .map(MedicationBuilder::toMedicationDTO)
                .collect(Collectors.toList());
    }

    public List<MedicationDTO> findMedicationByMedicationPlanId(UUID id) {
        List<Medication> medicationList = medicationRepository.findByMedicationPlanId(id);

        return medicationList.stream()
                .map(MedicationBuilder::toMedicationDTO)
                .collect(Collectors.toList());
    }

    public UUID insert(MedicationDTO medicationDTO) {
        Medication medication = MedicationBuilder.toEntity(medicationDTO);
        medication = medicationRepository.save(medication);
        LOGGER.debug("Medication with id {} was inserted in db", medication.getId());
        return medication.getId();
    }


    public UUID updateMedication(MedicationUpdateDTO medicationUpdateDTO)
    {
        Medication toUpdate = medicationRepository.findByName(medicationUpdateDTO.getOldName());
        if(toUpdate != null)
        {
            toUpdate.setName(medicationUpdateDTO.getNewName());
            toUpdate.setDosage(medicationUpdateDTO.getNewDosage());

            medicationRepository.save(toUpdate);
        }
        return toUpdate.getId();
    }

    public void deleteMedicationById(UUID id)
    {
        medicationRepository.deleteById(id);
    }

    public void deleteMedicationByName(String name)
    {
        medicationRepository.deleteMedicationByName(name);
    }

    public MedicationDTO findMedicationByName(String name) {
        Medication m = medicationRepository.findByName(name);
        if (m==null) {
            LOGGER.error("Medication with name {} was not found in db", name);
            throw new ResourceNotFoundException(Medication.class.getSimpleName() + " with name: " + name);
        }
        System.out.println(m.getId());
        return MedicationBuilder.toMedicationDTO(m);
    }

}
