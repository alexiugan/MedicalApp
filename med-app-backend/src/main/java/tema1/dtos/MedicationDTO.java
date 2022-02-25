package tema1.dtos;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

public class MedicationDTO {
    private UUID id;
    private String name;
    private double dosage;

    public MedicationDTO() {
    }

    public MedicationDTO(UUID id, String name, double dosage) {
        this.id = id;
        this.name = name;
        this.dosage = dosage;
    }

    public MedicationDTO(String name, double dosage) {
        this.name = name;
        this.dosage = dosage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getDosage() {
        return dosage;
    }

    public void setDosage(double dosage) {
        this.dosage = dosage;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MedicationDTO medicationDTO = (MedicationDTO) o;
        return dosage == medicationDTO.dosage &&
                Objects.equals(name, medicationDTO.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, dosage);
    }
}
