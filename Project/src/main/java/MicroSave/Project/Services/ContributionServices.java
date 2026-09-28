package MicroSave.Project.Services;

import MicroSave.Project.Repository.ContributionRepository;
import MicroSave.Project.models.Contribution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContributionServices {

    @Autowired
    private ContributionRepository repository;

    public Contribution create(Contribution data) {
        return repository.save(data);
    }

    public List<Contribution> getAll() {
        return repository.findAll();
    }

    public Contribution getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Contribution update(Long id, Contribution data) {
        Contribution old = repository.findById(id).orElse(null);

        if (old != null) {
            old.setAmount(data.getAmount());
            old.setContributionDate(data.getContributionDate());
            old.setMember(data.getMember());
            return repository.save(old);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}