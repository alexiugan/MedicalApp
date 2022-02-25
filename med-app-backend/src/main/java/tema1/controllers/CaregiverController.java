package tema1.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tema1.dtos.CaregiverDTO;
import tema1.dtos.CaregiverUpdateDTO;
import tema1.dtos.FrontDTO;
import tema1.dtos.FrontIdDTO;
import tema1.services.CaregiverService;


import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/caregiver")
public class CaregiverController {
    private final CaregiverService caregiverService;

    @Autowired
    public CaregiverController(CaregiverService caregiverService) {
        this.caregiverService = caregiverService;
    }

    @GetMapping()
    public ResponseEntity<List<CaregiverDTO>> getCaregivers() {
        List<CaregiverDTO> dtos = caregiverService.findCaregivers();
        System.out.println(dtos);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody CaregiverDTO caregiverDTO) {
        System.out.println("Saving caregiver...");
        UUID caregiverID = caregiverService.insert(caregiverDTO);
        System.out.println(caregiverID);
        return new ResponseEntity<>(caregiverID, HttpStatus.CREATED);
    }


    @PostMapping(value = "/name")
    public ResponseEntity<CaregiverDTO> getCaregiverByName(@Valid @RequestBody FrontDTO caregiver) {
        System.out.println("LOOKING FOR " + caregiver.getName());

        CaregiverDTO dto = caregiverService.findCaregiverByName(caregiver.getName());

        System.out.println("RESULT: " + dto.getName());
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping(value = "/id")
    public ResponseEntity<CaregiverDTO> getCaregiverById(@Valid @RequestBody FrontIdDTO caregiver) {

        CaregiverDTO dto = caregiverService.findCaregiverByID(caregiver.getId());

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }


    @PutMapping(value = "/update")
    public ResponseEntity<UUID> updateCaregiver(@Valid @RequestBody CaregiverUpdateDTO caregiverUpdateDTO) {
        UUID caregiverID =  caregiverService.updateCaregiver(caregiverUpdateDTO);
        return new ResponseEntity<>(caregiverID, HttpStatus.OK);
    }

    @DeleteMapping(value = "/del-by-name/{name}")
    public ResponseEntity<Integer> deleteCaregiverByName(@PathVariable("name") String caregiverName) {

        String name="";
        for(int i =0; i<caregiverName.length();i++)
        {
            if(caregiverName.charAt(i) == '-')
                name += ' ';
            else
                name+=caregiverName.charAt(i);
        }
        caregiverService.deleteCaregiverByName(name);

        return new ResponseEntity<>(1, HttpStatus.OK);
    }


}
