package MicroSave.Project.Repository;

import MicroSave.Project.models.Repayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepaymentRepository extends JpaRepository<Repayment, Long> {
}