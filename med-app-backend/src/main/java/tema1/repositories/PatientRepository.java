package tema1.repositories;

import org.hibernate.annotations.SQLInsert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.Patient;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, UUID> {

    /**
     * Example: JPA generate Query by Field
     */
    Patient findByName(String name);

    @Query(value = "SELECT p " +
            "FROM Patient p " +
            "WHERE p.caregiverID = :id")
    List<Patient> findByCaregiverId(@Param("id") UUID id);


    @Transactional
    @Modifying
    @Query(value = "DELETE " +
            "FROM Patient p " +
            "WHERE p.name = :name  ")
    void deletePatientByName(@Param("name") String name);


}
