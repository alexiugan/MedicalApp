package tema1.dtos;

import java.util.UUID;

public class FrontIdDTO {

    private UUID id;

    public FrontIdDTO(UUID id) {
        this.id = id;
    }

    public FrontIdDTO() {
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
