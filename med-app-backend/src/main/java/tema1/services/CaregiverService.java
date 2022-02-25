package tema1.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tema1.controllers.handlers.exceptions.model.ResourceNotFoundException;
import tema1.dtos.CaregiverDTO;
import tema1.dtos.CaregiverUpdateDTO;
import tema1.dtos.FrontDTO;
import tema1.dtos.builders.CaregiverBuilder;
import tema1.entities.Caregiver;
import tema1.repositories.CaregiverRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CaregiverService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CaregiverService.class);
    private final CaregiverRepository caregiverRepository;

    @Autowired
    public CaregiverService(CaregiverRepository caregiverRepository) {
        this.caregiverRepository = caregiverRepository;
    }

    public List<CaregiverDTO> findCaregivers() {
        List<Caregiver> caregiverList = caregiverRepository.findAll();
        return caregiverList.stream()
                .map(CaregiverBuilder::toCaregiverDTO)
                .collect(Collectors.toList());
    }

    public CaregiverDTO findCaregiverByName(String caregiver) {
        Caregiver c = caregiverRepository.findByName(caregiver);

        if (c==null) {
            LOGGER.error("Caregiver with name {} was not found in db", caregiver);
            throw new ResourceNotFoundException(Caregiver.class.getSimpleName() + " with name: " + caregiver);
        }

        return CaregiverBuilder.toCaregiverDTO(c);
    }

    public CaregiverDTO findCaregiverByID(UUID id) {
        Optional<Caregiver> c = caregiverRepository.findCaregiverByID(id);

        if (!c.isPresent()) {
            LOGGER.error("Caregiver with id {} was not found in db", id);
            throw new ResourceNotFoundException(Caregiver.class.getSimpleName() + " with id: " + id);
        }

        return CaregiverBuilder.toCaregiverDTO(c.get());
    }

    public UUID insert(CaregiverDTO caregiverDTO) {
        Caregiver caregiver = CaregiverBuilder.toEntity(caregiverDTO);
        caregiver = caregiverRepository.save(caregiver);
        LOGGER.debug("Caregiver with id {} was inserted in db", caregiver.getId());
        return caregiver.getId();
    }


    public UUID updateCaregiver(CaregiverUpdateDTO caregiverUpdateDTO)
    {
        Caregiver toUpdate = caregiverRepository.findByName(caregiverUpdateDTO.getOldName());

        toUpdate.setName(caregiverUpdateDTO.getNewName());
        toUpdate.setAddress(caregiverUpdateDTO.getNewAddress());
        toUpdate.setDate(caregiverUpdateDTO.getNewDate());
        toUpdate.setGender(caregiverUpdateDTO.getNewGender());
        caregiverRepository.save(toUpdate);
        return toUpdate.getId();
    }

    public void deleteCaregiverById(UUID id)
    {
        caregiverRepository.deleteById(id);
    }

    public void deleteCaregiverByName(String name)
    {
        caregiverRepository.deleteCaregiverByName(name);
    }

}
