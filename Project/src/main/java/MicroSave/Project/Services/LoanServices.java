package MicroSave.Project.Services;

import MicroSave.Project.Repository.LoanRepository;
import MicroSave.Project.models.Loan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanServices {

    @Autowired
    private LoanRepository repository;

    public Loan create(Loan data) {
        return repository.save(data);
    }

    public List<Loan> getAll() {
        return repository.findAll();
    }

    public Loan getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Loan update(Long id, Loan data) {
        Loan old = repository.findById(id).orElse(null);

        if (old != null) {
            old.setAmount(data.getAmount());
            old.setOutstandingAmount(data.getOutstandingAmount());
            old.setLoanDate(data.getLoanDate());
            old.setDueDate(data.getDueDate());
            old.setStatus(data.getStatus());

            return repository.save(old);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}