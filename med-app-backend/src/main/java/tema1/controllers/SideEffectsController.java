package tema1.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tema1.dtos.*;
import tema1.entities.sideEffects;
import tema1.services.CaregiverService;
import tema1.services.MedicationPlanService;
import tema1.services.MedicationService;
import tema1.services.SideEffectsService;


import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/effects")
public class SideEffectsController {
    private final SideEffectsService sideEffectsService;

    @Autowired
    public SideEffectsController(SideEffectsService sideEffectsService) {
        this.sideEffectsService = sideEffectsService;
    }

    @GetMapping()
    public ResponseEntity<List<SideEffectsDTO>> getSideEffects() {
        List<SideEffectsDTO> dtos = sideEffectsService.findSideEffects();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody SideEffectsDTO sideEffectsDTO) {
        UUID sideEffectsID = sideEffectsService.insert(sideEffectsDTO);
        return new ResponseEntity<>(sideEffectsID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SideEffectsDTO> getSideEffects(@PathVariable("id") UUID sideEffectsId) {
        SideEffectsDTO dto = sideEffectsService.findSideEffectsById(sideEffectsId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping(value = "/put")
    public ResponseEntity<UUID> updateSideEffects(@Valid @RequestBody SideEffectsDTO sideEffectsDTO) {
        UUID sideEffectsID =  sideEffectsService.updateSideEffects(sideEffectsDTO);
        return new ResponseEntity<>(sideEffectsID, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteSideEffectsPlan(@PathVariable("id") UUID sideEffectsId) {
        sideEffectsService.deleteSideEffectsById(sideEffectsId);
    }
    //TODO: UPDATE, DELETE per resource


}
