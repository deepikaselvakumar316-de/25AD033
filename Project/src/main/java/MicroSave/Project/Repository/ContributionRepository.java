package MicroSave.Project.Repository;

import MicroSave.Project.models.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ContributionRepository extends JpaRepository<Contribution, Long> {

    @Query("SELECT COALESCE(SUM(c.amount), 0) FROM Contribution c WHERE c.member.group.id = :groupId")
    double getTotalContribution(Long groupId);
}
