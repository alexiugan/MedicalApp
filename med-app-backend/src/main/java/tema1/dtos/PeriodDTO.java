package tema1.dtos;

public class PeriodDTO {
    private int period;

    public PeriodDTO(int period)
    {
        this.period=period;
    }

    public PeriodDTO()
    {}

    public int getPeriod() {
        return this.period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }
}
