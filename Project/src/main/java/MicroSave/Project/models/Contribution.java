package MicroSave.Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Contribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String contributionDate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}