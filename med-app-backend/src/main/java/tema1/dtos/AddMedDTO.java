package tema1.dtos;

import org.HdrHistogram.packedarray.PackedLongArray;
import tema1.entities.Medication;

import java.util.UUID;

public class AddMedDTO {

    private MedicationDTO med;
    private MedicationPlanDTO plan;

    public AddMedDTO(MedicationDTO med, MedicationPlanDTO plan) {
        this.med = med;
        this.plan = plan;
    }

    public MedicationDTO getMed() {
        return med;
    }

    public void setMed(MedicationDTO med) {
        this.med = med;
    }

    public MedicationPlanDTO getPlan() {
        return plan;
    }

    public void setPlan(MedicationPlanDTO plan) {
        this.plan = plan;
    }

    public AddMedDTO() {
    }


}
