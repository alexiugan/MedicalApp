package tema1.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tema1.dtos.*;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;
import tema1.services.CaregiverService;
import tema1.services.MedicationPlanService;
import tema1.services.MedicationService;


import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/medicationplan")
public class MedicationPlanController {
    private final MedicationPlanService medicationPlanService;

    @Autowired
    public MedicationPlanController(MedicationPlanService medicationPlanService) {
        this.medicationPlanService = medicationPlanService;
    }

    @GetMapping()
    public ResponseEntity<List<MedicationPlanDTO>> getMedicationPlans() {
        List<MedicationPlanDTO> dtos = medicationPlanService.findMedicationPlans();

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody MedicationPlanDTO medicationPlanDTO) {
        UUID medicationPlanID = medicationPlanService.insert(medicationPlanDTO);
        return new ResponseEntity<>(medicationPlanID, HttpStatus.CREATED);
    }


    @PostMapping(value = "/id")
    public ResponseEntity<List<MedicationPlanDTO>> getMedicationPlan(@Valid @RequestBody FrontIdDTO id) {
        List<MedicationPlanDTO> dtos = medicationPlanService.findMedicationPlanById(id.getId());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping(value = "/del-by-period/{period}")
    public ResponseEntity<Integer> deleteMedicationPlan(@PathVariable("period") int period) {
        System.out.println("Deleting med plan with period " + period);
        medicationPlanService.deleteMedicationPlanByPeriod(period);
        System.out.println("MED PLAN DELETED");
        return new ResponseEntity<>(1, HttpStatus.OK);
    }

    @PostMapping(value = "/period")
    public ResponseEntity<MedicationPlanDTO> getMedicationPlanByPeriod(@Valid @RequestBody PeriodDTO periodDTO) {
        System.out.println("LOOKING FOR MED: " + periodDTO.getPeriod());
        MedicationPlanDTO dto = medicationPlanService.findMedicationPlanByPeriod(periodDTO.getPeriod());
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }


    @PostMapping("/add-med")
    public ResponseEntity<Integer> addMed(@Valid @RequestBody AddMedDTO medDTO) {
        medicationPlanService.addMed(medDTO);
        return new ResponseEntity<>(1, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<UUID> updateMedPlan(@Valid @RequestBody MedicationPlanUpdateDTO medicationPlanUpdateDTO) {
        UUID medicationPlanID = medicationPlanService.updateMedicationPlan(medicationPlanUpdateDTO);
        return new ResponseEntity<>(medicationPlanID, HttpStatus.OK);
    }

}