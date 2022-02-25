package tema1.dtos;

import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

public class PatientDTO {
    private UUID id;
    private String name;
    private Date date;
    private char gender;
    private String address;
    private String medicalRecord;
    private UUID caregiverid;
    private UUID medplanid;
    private String birthday;


    public PatientDTO() {}

    public PatientDTO(UUID id ,String name, Date date, char gender, String address, String medicalRecord, UUID caregiverID, UUID medplanid) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.gender = Character.toUpperCase(gender);
        this.address = address;
        this.medicalRecord = medicalRecord;
        this.caregiverid = caregiverID;
        this.medplanid = medplanid;

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        birthday ="";
        birthday+= calendar.get(Calendar.DAY_OF_MONTH) + "-" + calendar.get(Calendar.MONTH) + "-" + calendar.get(Calendar.YEAR);
    }

    public String getBirthday() {
        return birthday;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMedicalRecord() {return medicalRecord;}

    public void setMedicalRecord(String medicalRecord) {this.medicalRecord = medicalRecord;}

    public UUID getCaregiverid() {
        return caregiverid;
    }

    public void setCaregiverid(UUID caregiverid) {
        this.caregiverid = caregiverid;
    }

    public UUID getMedplanid() {
        return medplanid;
    }

    public void setMedplanid(UUID medplanid) {
        this.medplanid = medplanid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatientDTO patientDTO = (PatientDTO) o;
        return gender == patientDTO.gender &&
                Objects.equals(name, patientDTO.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, gender);
    }
}
