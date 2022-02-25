package tema1.dtos.builders;


import tema1.dtos.*;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;

import java.util.ArrayList;
import java.util.List;

public class MedicationPlanBuilder {

    private MedicationPlanBuilder() {
    }

    public static MedicationPlanDTO toMedicationPlanDTO(MedicationPlan medicationPlan) {
        return new MedicationPlanDTO(medicationPlan.getId(), medicationPlan.getInterval(), medicationPlan.getPeriod());
    }

    public static MedicationPlan toEntity(MedicationPlanDTO medicationPlanDetailsDTO) {
        return new MedicationPlan(medicationPlanDetailsDTO.getId(), medicationPlanDetailsDTO.getInterval(),medicationPlanDetailsDTO.getPeriod());
    }



    public static MedicationPlanDTO toMedicationPlanDTOWithList(MedicationPlan medicationPlan) {
        List<String> l = new ArrayList<>();
        if(medicationPlan.getMedication() != null)
        {
            for(Medication m: medicationPlan.getMedication())
                l.add(m.getName());
        }
        return new MedicationPlanDTO(medicationPlan.getId(), medicationPlan.getInterval(), medicationPlan.getPeriod(), l);
    }

    public static MedicationPlan toEntityWithList(MedicationPlanDTO medicationPlanDetailsDTO) {
        return new MedicationPlan(medicationPlanDetailsDTO.getId(), medicationPlanDetailsDTO.getInterval(),medicationPlanDetailsDTO.getPeriod(), new ArrayList<Medication>());
    }
}
