package MicroSave.Project.Repository;

import MicroSave.Project.models.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    boolean existsByMemberIdAndStatus(Long memberId, String status);

    @Query("SELECT COALESCE(SUM(l.outstandingAmount), 0) FROM Loan l WHERE l.member.group.id = :groupId AND l.status = 'ACTIVE'")
    double getOutstandingLoans(Long groupId);
}