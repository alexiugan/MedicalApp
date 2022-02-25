package tema1.dtos.builders;


import tema1.dtos.*;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;
import tema1.entities.sideEffects;

public class SideEffectsBuilder {

    private SideEffectsBuilder() {
    }

    public static SideEffectsDTO toSideEffectsDTO(sideEffects sideEffects) {
        return new SideEffectsDTO(sideEffects.getId(), sideEffects.getEffect());
    }

    public static sideEffects toEntity(SideEffectsDTO sideEffectsDTO) {
        return new sideEffects(sideEffectsDTO.getId(), sideEffectsDTO.getEffect());
    }
}
