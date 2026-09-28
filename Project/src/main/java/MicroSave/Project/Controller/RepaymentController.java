package MicroSave.Project.Controller;

import MicroSave.Project.Services.RepaymentServices;
import MicroSave.Project.models.Repayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/repayments")
public class RepaymentController {

    @Autowired
    private RepaymentServices service;

    @PostMapping
    public Repayment create(@RequestBody Repayment data) {
        return service.create(data);
    }

    @GetMapping
    public List<Repayment> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Repayment getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Repayment update(@PathVariable Long id,
                            @RequestBody Repayment data) {
        return service.update(id, data);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Repayment deleted";
    }
}