package tema1.entities;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
public class sideEffects implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    @Column(name = "effect", nullable = false)
    private String effect;


    public sideEffects() {
    }

    public sideEffects(UUID id, String effect) {
        this.id = id;
        this.effect = effect;
    }

    public UUID getId(){return id;}

    public void setId(UUID id){this.id = id;}

    public String getEffect() {
        return effect;
    }

    public void setEffect(String effect) {
        this.effect = effect;
    }
}
