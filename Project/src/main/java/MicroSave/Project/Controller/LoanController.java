package MicroSave.Project.Controller;

import MicroSave.Project.Services.LoanServices;
import MicroSave.Project.models.Loan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {

    @Autowired
    private LoanServices service;

    @PostMapping
    public Loan create(@RequestBody Loan data) {
        return service.create(data);
    }

    @GetMapping
    public List<Loan> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Loan getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Loan update(@PathVariable Long id,
                       @RequestBody Loan data) {
        return service.update(id, data);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Loan deleted";
    }
}