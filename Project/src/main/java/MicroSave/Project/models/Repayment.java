package MicroSave.Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Repayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String repaymentDate;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;
}