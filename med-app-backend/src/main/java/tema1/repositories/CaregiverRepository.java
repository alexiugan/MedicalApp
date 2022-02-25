package tema1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CaregiverRepository extends JpaRepository<Caregiver, UUID> {

    /**
     * Example: JPA generate Query by Field
     */
    @Query(value = "SELECT c " +
            "FROM Caregiver c " +
            "WHERE c.name = :name ")
    Optional<Caregiver> findCaregiverByName(@Param("name") String name);

    Caregiver findByName(String name);
    /**
     * Example: Write Custom Query
     */


    @Transactional
    @Modifying
    @Query(value = "DELETE " +
            "FROM Caregiver c " +
            "WHERE c.name = :name  ")
    void deleteCaregiverByName(@Param("name") String name);

    @Query(value = "SELECT c " +
            "FROM Caregiver c " +
            "WHERE c.id = :id")
    Optional<Caregiver> findCaregiverByID(@Param("id") UUID id);
}
