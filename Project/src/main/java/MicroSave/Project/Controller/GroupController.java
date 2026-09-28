package MicroSave.Project.Controller;

import MicroSave.Project.Services.GroupServices;
import MicroSave.Project.models.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupServices service;

    @PostMapping
    public Group create(@RequestBody Group data) {
        return service.create(data);
    }

    @GetMapping
    public List<Group> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Group getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Group update(@PathVariable Long id, @RequestBody Group data) {
        return service.update(id, data);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Group deleted";
    }
}