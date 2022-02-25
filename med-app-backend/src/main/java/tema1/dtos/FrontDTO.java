package tema1.dtos;

public class FrontDTO {

    private String name;

    public FrontDTO(String name) {
        this.name = name;
    }

    public FrontDTO(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
