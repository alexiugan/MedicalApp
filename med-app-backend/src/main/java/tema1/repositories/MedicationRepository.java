package tema1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import tema1.entities.Caregiver;
import tema1.entities.Medication;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MedicationRepository extends JpaRepository<Medication, UUID> {



    /**
     * Example: Write Custom Query
     */
//    @Query(value = "SELECT m " +
//            "FROM Medication m " +
//            "WHERE m.name = :name  ")
//    Optional<Medication> findMedicationByName(@Param("name") String name);


    @Query(value = "SELECT m " +
            "FROM med_for_plan_medication m join medication med on m.med_id=med.id " +
            "WHERE m.plan_id = :id  ", nativeQuery = true)
    List<Medication> findByMedicationPlanId(@Param("id") UUID id);

    @Transactional
    @Modifying
    @Query(value = "DELETE " +
            "FROM Medication m " +
            "WHERE m.name = :name  ")
    void deleteMedicationByName(@Param("name") String name);

    Medication findByName(String name);
}