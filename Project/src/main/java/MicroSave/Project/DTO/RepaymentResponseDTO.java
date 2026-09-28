package MicroSave.Project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepaymentResponseDTO {

    private Long Id;
    private Long LoanId;
    private double Amount;
}