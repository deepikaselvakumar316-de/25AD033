package MicroSave.Project.Controller;

import MicroSave.Project.Services.MemberServices;
import MicroSave.Project.models.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberServices service;

    @PostMapping
    public Member create(@RequestBody Member data) {
        return service.create(data);
    }

    @GetMapping
    public List<Member> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Member getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Member update(@PathVariable Long id, @RequestBody Member data) {
        return service.update(id, data);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Member deleted";
    }
}