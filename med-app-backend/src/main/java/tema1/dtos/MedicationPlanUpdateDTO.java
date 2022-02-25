package tema1.dtos;

public class MedicationPlanUpdateDTO {
    private int oldPeriod;
    private int newPeriod;
    private int newInterval;

    public int getOldPeriod() {
        return oldPeriod;
    }

    public int getNewPeriod() {
        return newPeriod;
    }

    public int getNewInterval() {
        return newInterval;
    }
}
