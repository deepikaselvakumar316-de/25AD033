package MicroSave.Project.Services;

import MicroSave.Project.Repository.MemberRepository;
import MicroSave.Project.models.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServices {

    @Autowired
    private MemberRepository repository;

    public Member create(Member data) {
        return repository.save(data);
    }

    public List<Member> getAll() {
        return repository.findAll();
    }

    public Member getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Member update(Long id, Member data) {
        Member old = repository.findById(id).orElse(null);

        if (old != null) {
            old.setName(data.getName());
            old.setPhone(data.getPhone());
            old.setAddress(data.getAddress());
            old.setStatus(data.getStatus());
            old.setGroup(data.getGroup());
            return repository.save(old);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}