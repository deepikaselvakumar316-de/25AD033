package MicroSave.Project.Controller;

import MicroSave.Project.Services.ContributionServices;
import MicroSave.Project.models.Contribution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contributions")
public class ContributionController {

    @Autowired
    private ContributionServices service;

    @PostMapping
    public Contribution create(@RequestBody Contribution data) {
        return service.create(data);
    }

    @GetMapping
    public List<Contribution> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Contribution getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Contribution update(@PathVariable Long id,
                               @RequestBody Contribution data) {
        return service.update(id, data);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Contribution deleted";
    }
}