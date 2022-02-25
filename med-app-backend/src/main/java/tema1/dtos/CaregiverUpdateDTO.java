package tema1.dtos;

import java.sql.Date;

public class CaregiverUpdateDTO {
    private String oldName;
    private String newName;
    private char newGender;
    private Date newDate;
    private String newAddress;

    public String getOldName() {
        return oldName;
    }

    public String getNewName() {
        return newName;
    }

    public char getNewGender() {
        return newGender;
    }

    public Date getNewDate() {
        return newDate;
    }

    public String getNewAddress() {
        return newAddress;
    }
}
