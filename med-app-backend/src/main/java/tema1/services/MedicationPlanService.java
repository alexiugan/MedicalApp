package tema1.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tema1.controllers.handlers.exceptions.model.ResourceNotFoundException;
import tema1.dtos.*;
import tema1.entities.addMed;
import tema1.dtos.builders.*;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;
import tema1.entities.Patient;
import tema1.repositories.CaregiverRepository;
import tema1.repositories.MedicationPlanRepository;
import tema1.repositories.MedicationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MedicationPlanService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MedicationPlanService.class);
    private final MedicationPlanRepository medicationPlanRepository;

    @Autowired
    private MedicationRepository medicationRepository;



    @Autowired
    public MedicationPlanService(MedicationPlanRepository medicationPlanRepository) {
        this.medicationPlanRepository = medicationPlanRepository;
    }

    public List<MedicationPlanDTO> findMedicationPlans() {
        List<MedicationPlan> medicationPlanList = medicationPlanRepository.findAll();
        return medicationPlanList.stream()
                .map(MedicationPlanBuilder::toMedicationPlanDTOWithList)
                .collect(Collectors.toList());
    }

    public List<MedicationPlanDTO> findMedicationPlanById(UUID id) {
        List<MedicationPlan> medPlanList = medicationPlanRepository.findByID(id);
        return medPlanList.stream()
                .map(MedicationPlanBuilder::toMedicationPlanDTOWithList)
                .collect(Collectors.toList());
    }

    public UUID insert(MedicationPlanDTO medicationPlanDTO) {
        MedicationPlan medicationPlan = MedicationPlanBuilder.toEntity(medicationPlanDTO);
        medicationPlan = medicationPlanRepository.save(medicationPlan);
        LOGGER.debug("MedicationPlan with id {} was inserted in db", medicationPlan.getId());
        return medicationPlan.getId();
    }


    public UUID updateMedicationPlan(MedicationPlanUpdateDTO medicationPlanUpdateDTO)
    {
        MedicationPlan toUpdate = medicationPlanRepository.findByPeriod(medicationPlanUpdateDTO.getOldPeriod());
        if(toUpdate != null)
        {
            toUpdate.setInterval(medicationPlanUpdateDTO.getNewInterval());
            toUpdate.setPeriod(medicationPlanUpdateDTO.getNewPeriod());

            medicationPlanRepository.save(toUpdate);
        }
        return toUpdate.getId();
    }

    public void deleteMedicationPlanById(UUID id)
    {
        medicationPlanRepository.deleteById(id);
    }

    public void deleteMedicationPlanByPeriod(int period)
    {
        medicationPlanRepository.deleteByPeriod(period);
    }

    public MedicationPlanDTO findMedicationPlanByPeriod(int period) {
        MedicationPlan m = medicationPlanRepository.findByPeriod(period);
        if (m==null) {
            LOGGER.error("Medication plan with period {} was not found in db", period);
            throw new ResourceNotFoundException(MedicationPlan.class.getSimpleName() + " with period: " + period);
        }
        System.out.println(m.getId());
        return MedicationPlanBuilder.toMedicationPlanDTOWithList(m);
    }
/*
    public List<MedicationDTO> getMed(UUID id){
        List<UUID> medList = patientRepository.findMedByPlan(id);
        return medList.stream()
                .map(PatientBuilder::toPatientDTO)
                .collect(Collectors.toList());
    }
*/
    public void addMed(AddMedDTO addMedDTO) {
        MedicationPlan medplan = MedicationPlanBuilder.toEntityWithList(addMedDTO.getPlan());
        MedicationService medserv = new MedicationService(medicationRepository);

        boolean alreadyAdded = false;

        if(medplan.getMedication() == null)
        {
            medplan.setMedication(new ArrayList<>());
        }

        if(addMedDTO.getPlan().getMedication() != null) {
            for (String s : addMedDTO.getPlan().getMedication()) {
                MedicationDTO m = medserv.findMedicationByName(s);
                medplan.getMedication().add(MedicationBuilder.toEntity(m));

                if(s.equals(addMedDTO.getMed().getName()))
                    alreadyAdded=true;
            }
        }

        if(!alreadyAdded) {
            Medication med = MedicationBuilder.toEntity(addMedDTO.getMed());
            medplan.addMedication(med);
        }
        medicationPlanRepository.save(medplan);
    }

}
