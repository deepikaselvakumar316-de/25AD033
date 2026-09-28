package MicroSave.Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;
    private String groupCode;
    private String description;
}