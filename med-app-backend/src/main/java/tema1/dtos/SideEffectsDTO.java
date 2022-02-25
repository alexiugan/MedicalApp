package tema1.dtos;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

public class SideEffectsDTO {
    private UUID id;
    private String effect;

    public SideEffectsDTO() {
    }

    public SideEffectsDTO(UUID id, String effect) {
        this.id = id;
        this.effect= effect;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }


    public String getEffect(){ return this.effect;}

    public void setEffect(String effect) {this.effect = effect;}



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SideEffectsDTO sideEffectsDTO = (SideEffectsDTO) o;
        return effect.equals(sideEffectsDTO.effect);
    }

    @Override
    public int hashCode() {
        return Objects.hash(effect);
    }
}
