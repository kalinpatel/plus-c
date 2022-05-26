import { BsArrowRightShort } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import { MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@/atoms/defaultButton";

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
  const navigate = useNavigate();
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
            navigate("/help");
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
