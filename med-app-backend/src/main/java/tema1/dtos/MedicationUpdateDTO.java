package tema1.dtos;

public class MedicationUpdateDTO {

    private String oldName;
    private String newName;
    private double newDosage;

    public String getOldName() {
        return oldName;
    }

    public String getNewName() {
        return newName;
    }

    public double getNewDosage() {
        return newDosage;
    }
}
