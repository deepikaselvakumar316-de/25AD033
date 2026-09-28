package MicroSave.Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private String address;
    private String status;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}