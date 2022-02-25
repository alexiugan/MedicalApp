package tema1.dtos;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;
import java.util.spi.CalendarNameProvider;

public class CaregiverDTO {
    private UUID id;
    private String name;
    private Date date;
    private char gender;
    private String address;
    private String birthday;

    public CaregiverDTO() {
    }

    public CaregiverDTO(UUID id, String name, Date date, char gender, String address) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.gender = Character.toUpperCase(gender);
        this.address = address;

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        birthday ="";
        birthday+= calendar.get(Calendar.DAY_OF_MONTH) + "-" + calendar.get(Calendar.MONTH) + "-" + calendar.get(Calendar.YEAR);
    }

    public String getBirthday() {
        return birthday;
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

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CaregiverDTO caregiverDTO = (CaregiverDTO) o;
        return gender == caregiverDTO.gender &&
                Objects.equals(name, caregiverDTO.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, gender);
    }
}
