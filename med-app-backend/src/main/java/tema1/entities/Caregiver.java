package tema1.entities;
import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
public class Caregiver implements Serializable{



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

    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Patient> patients;

    public Caregiver() {
    }

    public Caregiver(UUID id, String name, Date date, char gender, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.date = date;
        this.gender=gender;
    }
    public Caregiver(UUID id, String name, Date date, char gender, String address, List<Patient> patients) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.date = date;
        this.gender=gender;
        this.patients=patients;
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

    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }
}
