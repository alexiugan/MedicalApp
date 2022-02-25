package tema1.repositories;

import org.hibernate.annotations.SQLInsert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;
import tema1.entities.Patient;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MedicationPlanRepository extends JpaRepository<MedicationPlan, UUID> {


    /**
     * Example: Write Custom Query
     */
    @Query(value = "SELECT m " +
            "FROM MedicationPlan m " +
            "WHERE m.period = :period  ")
    Optional<MedicationPlan> findMedicationPlanByPeriod(@Param("period") int period);

    @Transactional
    @Modifying
    @Query(value = "Delete " +
            "FROM MedicationPlan m " +
            "WHERE m.period = :period  ")
    void deleteByPeriod(@Param("period") int period);

    MedicationPlan findByPeriod(int period);



    @Query(value = "SELECT m " +
            "FROM MedicationPlan m " +
            "WHERE m.id = :id")
    List<MedicationPlan> findByID(@Param("id") UUID id);

/*
    @Query(value = "SELECT m " +
            "FROM med_for_plan_medication m " +
            "WHERE m.planid = :id")
    List<UUID> findMed(@Param("id") UUID id);


    @SQLInsert(sql = "INSERT INTO med_for_plan_medication(plan_id, med_id) " +
            "Values(decode(replace('b96cba85-0c9b-48b7-9190-fb4feadfb8ff'::text, " +
            "'-', ''), 'hex'),decode(replace('01cc51e2-9513-41aa-a16a-d1db7160ad13'::text " +
            "'-', ''), 'hex'))")
    void addMed();
*/
}
