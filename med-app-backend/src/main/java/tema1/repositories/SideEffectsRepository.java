package tema1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tema1.entities.Caregiver;
import tema1.entities.Medication;
import tema1.entities.MedicationPlan;
import tema1.entities.sideEffects;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SideEffectsRepository extends JpaRepository<sideEffects, UUID> {

    /**
     * Example: JPA generate Query by Field
     */
    List<sideEffects> findByEffect(String effect);

    /**
     * Example: Write Custom Query
     */
    @Query(value = "SELECT s " +
            "FROM sideEffects s " +
            "WHERE s.effect = :effect  ")
    Optional<sideEffects> findSideEffectsByEffect(@Param("effect") String effect);
}
