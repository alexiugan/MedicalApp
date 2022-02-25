package tema1.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tema1.dtos.*;
import tema1.entities.Medication;
import tema1.services.MedicationService;


import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/medication")
public class MedicationController {
    private final MedicationService medicationService;

    @Autowired
    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping()
    public ResponseEntity<List<MedicationDTO>> getMedications() {
        List<MedicationDTO> dtos = medicationService.findMedications();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody MedicationDTO medicationDTO) {
        UUID medicationID = medicationService.insert(medicationDTO);
        return new ResponseEntity<>(medicationID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<List<MedicationDTO>> getMedicationOfMedcationPlan(@PathVariable("id") UUID medicationPlanId) {
        List<MedicationDTO> dto = medicationService.findMedicationByMedicationPlanId(medicationPlanId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<UUID> updateMedication(@Valid @RequestBody MedicationUpdateDTO medicationUpdateDTO) {

        UUID id = medicationService.updateMedication(medicationUpdateDTO);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @DeleteMapping(value = "/del-by-name/{name}")
    public ResponseEntity<Integer> deleteMedicationByName(@PathVariable("name") String medName) {

        String name="";
        for(int i =0; i<medName.length();i++)
        {
            if(medName.charAt(i) == '-')
                name += ' ';
            else
                name+=medName.charAt(i);
        }
        medicationService.deleteMedicationByName(name);

        return new ResponseEntity<>(1, HttpStatus.OK);
    }

    @PostMapping(value = "/name")
    public ResponseEntity<MedicationDTO> getMedicationByName(@Valid @RequestBody  FrontDTO dto) {

        MedicationDTO d = medicationService.findMedicationByName(dto.getName());
        return new ResponseEntity<>(d, HttpStatus.OK);
    }
}
