package tema1.dtos;

import tema1.entities.Medication;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class MedicationPlanDTO {
    private UUID id;
    private int interval;
    private int period;
    private List<String> medication;
    private String medicationNames;


    public MedicationPlanDTO() {
    }

    public MedicationPlanDTO(UUID id, int interval, int period, List<String> med) {
        this.id = id;
        this.interval = interval;
        this.period = period;
        this.medication = med;
        this.medicationNames = "";
        for(int i=0; i<med.size(); i++)
        {
            medicationNames+= med.get(i);
            if(i!= med.size()-1)
                medicationNames+=", ";
        }
    }

    public MedicationPlanDTO(UUID id, int interval, int period) {
        this.id = id;
        this.interval = interval;
        this.period = period;
    }

    public String getMedicationNames() {
        return medicationNames;
    }

    public List<String> getMedication() {
        return medication;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MedicationPlanDTO medicationPlanDTO = (MedicationPlanDTO) o;
        return interval == medicationPlanDTO.interval &&
                Objects.equals(period, medicationPlanDTO.period);
    }

    @Override
    public int hashCode() {
        return Objects.hash(interval, period);
    }
}
