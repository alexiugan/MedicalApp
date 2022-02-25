package tema1.entities;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
public class Medication implements Serializable{



    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany
    @Column(name = "sideEffects", nullable=false)
    private List<sideEffects> sideEffects;

    @Column(name = "dosage", nullable = false)
    private double dosage;

    @ManyToMany(mappedBy = "medication", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<MedicationPlan> medicationPlans;

    public Medication() {
    }

    public Medication(UUID id, String name, double dosage) {
        this.id = id;
        this.name = name;
        this.dosage=dosage;
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

    public List<tema1.entities.sideEffects> getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(List<tema1.entities.sideEffects> sideEffects) {
        this.sideEffects = sideEffects;
    }

    public double getDosage() {
        return dosage;
    }

    public void setDosage(double dosage) {
        this.dosage = dosage;
    }

}
