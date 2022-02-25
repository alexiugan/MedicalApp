package tema1.entities;

import java.util.UUID;

public class addMed {

    private UUID medid;
    private UUID planid;

    public addMed(UUID medid, UUID planid) {
        this.medid = medid;
        this.planid = planid;
    }

    public addMed() {
    }


    public UUID getMedId() {
        return medid;
    }

    public void setMedid(UUID medid) {
        this.medid = medid;
    }

    public UUID getPlanId() {
        return planid;
    }

    public void setPlanid(UUID planid) {
        this.planid = planid;
    }

}
