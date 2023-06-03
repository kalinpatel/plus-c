import Button from "@/atoms/defaultButton";
import { BsArrowRightShort } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { TiLightbulb } from "react-icons/ti";
import styled from "styled-components";

interface MathSubmitButtonsRowProps {
  onReset: () => void;
  canSubmit: boolean;
}

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

export default function MathSubmitButtonsRow({
  onReset,
  canSubmit,
}: MathSubmitButtonsRowProps) {
  return (
    <StyledColumn>
      <Button
        // disabled={!canSubmit}
        type="submit"
        className={`${!canSubmit ? "disabled" : ""} icon primary`}
      >
        Calculate <BsArrowRightShort />
      </Button>
      <StyledRow>
        <Button
          onClick={() => {
            window.open(
              "https://www.khanacademy.org/math/ap-calculus-bc/bc-differential-equations-new/bc-7-5/v/eulers-method",
              "_blank"
            );
          }}
          type="button"
          className="icon"
        >
          How to Use <TiLightbulb />
        </Button>
        <Button onClick={onReset} type="reset" className="icon">
          Clear All <MdClear />
        </Button>
      </StyledRow>
    </StyledColumn>
  );
}
