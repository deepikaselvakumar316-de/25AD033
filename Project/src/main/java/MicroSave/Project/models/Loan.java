package MicroSave.Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private double outstandingAmount;
    private String loanDate;
    private String dueDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}