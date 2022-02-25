package tema1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tema1.dtos.LoginDTO;
import tema1.entities.Login;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LoginRepository extends JpaRepository<Login, UUID> {


    Login findByUsername(String username);

    /**
     * Example: Write Custom Query
     */
    @Query(value = "SELECT l " +
            "FROM Login l " +
            "WHERE l.username = :username " +
            "AND l.password = :password  ")
    Optional<Login> findByCredentials(@Param("username") String username, @Param("password") String password);


}
