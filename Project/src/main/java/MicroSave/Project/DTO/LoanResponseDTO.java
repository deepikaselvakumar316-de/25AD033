package MicroSave.Project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanResponseDTO {

    private Long Id;
    private Long MemberId;
    private double Amount;
    private double InterestRate;
}