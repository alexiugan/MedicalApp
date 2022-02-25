package tema1.dtos;

import java.util.Date;
import java.util.UUID;

public class PatientUpdateDTO {
    private String oldName;
    private String newName;
    private String newAddress;
    private Date newDate;
    private char newGender;
    private String newMedicalRecord;
    private UUID newCaregiverID;
    private UUID newMedplanid;

    public String getOldName() {
        return oldName;
    }

    public String getNewName() {
        return newName;
    }

    public String getNewAddress() {
        return newAddress;
    }

    public Date getNewDate() {
        return newDate;
    }

    public char getNewGender() {
        return newGender;
    }

    public String getNewMedicalRecord() {
        return newMedicalRecord;
    }

    public UUID getNewCaregiverID() {
        return newCaregiverID;
    }

    public UUID getNewMedplanid() {
        return newMedplanid;
    }
}
