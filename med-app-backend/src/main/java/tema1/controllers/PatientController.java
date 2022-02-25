package tema1.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tema1.dtos.*;
import tema1.services.MedicationService;
import tema1.services.PatientService;


import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/patient")
public class PatientController {
    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping()
    public ResponseEntity<List<PatientDTO>> getPatients() {
        System.out.println("Getting patients...");
        List<PatientDTO> dtos = patientService.findPatients();
        for(PatientDTO p: dtos)
            System.out.println(p.getName());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody PatientDTO patientDTO) {
        System.out.println("Saving patient...");
        System.out.println(patientDTO.getCaregiverid());
        UUID patientID = patientService.insert(patientDTO);
        return new ResponseEntity<>(patientID, HttpStatus.CREATED);
    }

    @PostMapping("/find-by-caregiver")
    public ResponseEntity<List<PatientDTO>> getPatientsForCaregiver(@Valid @RequestBody FrontIdDTO id) {
        System.out.println("SENDING "  + id.getId());
        List<PatientDTO> dtos = patientService.findPatientsByCaregiverId(id.getId());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/name")
    public ResponseEntity<PatientDTO> getPatientByName(@Valid @RequestBody FrontDTO name) {
        PatientDTO dto = patientService.findPatientByName(name.getName());
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PatientDTO> getPatient(@PathVariable("id") UUID patientId) {
        PatientDTO dto = patientService.findPatientById(patientId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<UUID> updatePatient(@Valid @RequestBody PatientUpdateDTO patientUpdateDTO) {
        UUID patientID =  patientService.updatePatient(patientUpdateDTO);
        return new ResponseEntity<>(patientID, HttpStatus.OK);
    }

    @DeleteMapping(value = "/del-by-name/{name}")
    public ResponseEntity<Integer> deletePatientByName(@PathVariable("name") String patientName) {
       
        String name="";
        for(int i =0; i<patientName.length();i++)
        {
            if(patientName.charAt(i) == '-')
                name += ' ';
            else
                name+=patientName.charAt(i);
        }
        patientService.deletePatientByName(name);

        return new ResponseEntity<>(1, HttpStatus.OK);
    }



}
