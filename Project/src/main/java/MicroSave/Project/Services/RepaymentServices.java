package MicroSave.Project.Services;

import MicroSave.Project.Repository.RepaymentRepository;
import MicroSave.Project.models.Repayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepaymentServices {

    @Autowired
    private RepaymentRepository repository;

    public Repayment create(Repayment data) {
        return repository.save(data);
    }

    public List<Repayment> getAll() {
        return repository.findAll();
    }

    public Repayment getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Repayment update(Long id, Repayment data) {
        Repayment old = repository.findById(id).orElse(null);

        if (old != null) {
            old.setAmount(data.getAmount());
            old.setRepaymentDate(data.getRepaymentDate());
            old.setLoan(data.getLoan());

            return repository.save(old);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}