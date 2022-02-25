package tema1.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tema1.controllers.handlers.exceptions.model.ResourceNotFoundException;
import tema1.dtos.*;
import tema1.dtos.builders.CaregiverBuilder;
import tema1.dtos.builders.MedicationBuilder;
import tema1.dtos.builders.MedicationPlanBuilder;
import tema1.dtos.builders.SideEffectsBuilder;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;
import tema1.entities.sideEffects;
import tema1.repositories.CaregiverRepository;
import tema1.repositories.MedicationPlanRepository;
import tema1.repositories.MedicationRepository;
import tema1.repositories.SideEffectsRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SideEffectsService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SideEffectsService.class);
    private final SideEffectsRepository sideEffectsRepository;

    @Autowired
    public SideEffectsService(SideEffectsRepository sideEffectsRepository) {
        this.sideEffectsRepository = sideEffectsRepository;
    }

    public List<SideEffectsDTO> findSideEffects() {
        List<sideEffects> sideEffectsList = sideEffectsRepository.findAll();
        return sideEffectsList.stream()
                .map(SideEffectsBuilder::toSideEffectsDTO)
                .collect(Collectors.toList());
    }

    public SideEffectsDTO findSideEffectsById(UUID id) {
        Optional<sideEffects> prosumerOptional = sideEffectsRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("SideEffects with id {} was not found in db", id);
            throw new ResourceNotFoundException(sideEffects.class.getSimpleName() + " with id: " + id);
        }
        return SideEffectsBuilder.toSideEffectsDTO(prosumerOptional.get());
    }

    public UUID insert(SideEffectsDTO sideEffectsDTO) {
        sideEffects sideEffects = SideEffectsBuilder.toEntity(sideEffectsDTO);
        sideEffects = sideEffectsRepository.save(sideEffects);
        LOGGER.debug("SideEffects with id {} was inserted in db", sideEffects.getId());
        return sideEffects.getId();
    }


    public UUID updateSideEffects(SideEffectsDTO sideEffectsDTO)
    {
        sideEffects sideEffects = SideEffectsBuilder.toEntity(sideEffectsDTO);

        if(sideEffectsRepository.findById(sideEffects.getId()) != null)
        {
            sideEffectsRepository.deleteById(sideEffects.getId());
            sideEffectsRepository.save(sideEffects);
        }
        return sideEffects.getId();
    }

    public void deleteSideEffectsById(UUID id)
    {
        sideEffectsRepository.deleteById(id);
    }

}
