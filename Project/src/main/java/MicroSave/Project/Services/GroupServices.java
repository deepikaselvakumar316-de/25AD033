package MicroSave.Project.Services;

import MicroSave.Project.Repository.GroupRepository;
import MicroSave.Project.models.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServices {

    @Autowired
    private GroupRepository repository;

    public Group create(Group data) {
        return repository.save(data);
    }

    public List<Group> getAll() {
        return repository.findAll();
    }

    public Group getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Group update(Long id, Group data) {
        Group old = repository.findById(id).orElse(null);

        if (old != null) {
            old.setGroupName(data.getGroupName());
            old.setGroupCode(data.getGroupCode());
            old.setDescription(data.getDescription());
            return repository.save(old);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}