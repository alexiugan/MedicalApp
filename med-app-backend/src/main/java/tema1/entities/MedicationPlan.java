package tema1.entities;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
public class MedicationPlan implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    //la cate ore sa ia medicamentul
    @Column(name = "interval", nullable=false)
    private int interval;

    //pentru cate luni trebuie facut tratamentul
    @Column(name = "period", nullable = false)
    private int period;

    @OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "id", referencedColumnName = "medplanid", insertable = false, updatable = false)
    private Patient patient;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "med_for_plan_medication",
            joinColumns = {@JoinColumn(name = "plan_id")},
            inverseJoinColumns = {@JoinColumn(name = "med_id")}
    )
    private List<Medication> medication;

    public MedicationPlan() {
    }

    public MedicationPlan(UUID id, int interval, int period) {
        this.id = id;
        this.interval = interval;
        this.period=period;
        this.medication = new ArrayList<>();
    }

    public MedicationPlan(UUID id, int interval, int period, List<Medication> med) {
        this.id = id;
        this.interval = interval;
        this.period=period;
        this.medication = med;
    }



    public List<Medication> getMedication() {
        return medication;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setMedication(List<Medication> medication) {
        this.medication = medication;
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

    public void addMedication(Medication med){
        if(this.medication == null)
            this.medication = new ArrayList<>();

        this.medication.add(med);

        for(Medication medd: this.medication)
            System.out.println(medd.getName());
    }
}
