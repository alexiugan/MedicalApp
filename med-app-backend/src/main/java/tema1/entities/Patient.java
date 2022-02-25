package tema1.entities;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
public class Patient implements Serializable {


    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "date", nullable=false)
    private Date date;

    @Column(name = "gender", nullable = false)
    private char gender;

    @Column(name = "address", nullable = false)
    private String address;
    
    @Column(name = "record", nullable = false)
    private String medicalRecord;

    @Type(type = "uuid-binary")
    @Column(name = "caregiverid", nullable = false)
    private UUID caregiverID;

    @Type(type = "uuid-binary")
    @Column(name = "medplanid", nullable = false)
    private UUID medplanid;

    @OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "medplanid", referencedColumnName = "id", insertable = false, updatable = false)
    private MedicationPlan medplan;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "caregiverid", referencedColumnName = "id", insertable = false, updatable = false)
    private Caregiver caregiver;

    public Patient() {
    }

    public Patient(UUID id, String name, String address, Date date, char gender, String medicalRecord, UUID caregiverID, UUID medplanID) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.date = date;
        this.gender=gender;
        this.medicalRecord = medicalRecord;
        this.medplanid = medplanID;
        this.caregiverID = caregiverID;
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

    public String getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(String medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    public Caregiver getCaregiver(){return caregiver;}

    public void setCaregiver(Caregiver caregiver){this.caregiver=caregiver;}

    public UUID getCaregiverID() {
        return caregiverID;
    }

    public void setCaregiverID(UUID id) {
        this.caregiverID = id;
    }

    public UUID getmedplanid() {
        return medplanid;
    }

    public void setmedplanid(UUID id) {
        this.medplanid = id;
    }
}

