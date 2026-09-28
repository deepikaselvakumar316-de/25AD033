package MicroSave.Project.Repository;

import MicroSave.Project.models.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}