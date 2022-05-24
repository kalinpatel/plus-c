import { BsArrowRightShort } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import { MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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

export const Button = styled.button`
  background-color: ${({ theme }) =>
    theme.darkMode
      ? theme.colors.peripheral.darkGrey
      : theme.colors.peripheral.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
  padding: 12px;
  color: ${({ theme }) => theme.colors.themed.minor};
  cursor: pointer;
  transition: background-color 0.18s ease-in-out, color 0.18s ease-in-out,
    opacity 0.18s ease-in-out;
  min-width: 120px;
  font-weight: 500;
  position: relative;
  &.icon {
    padding-right: 40px;
  }
  &:hover:not(.disabled) {
    background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  }
  svg {
    width: auto;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(-2px, -50%);
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.brand.primary};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.themed.alwaysLight};
  &:hover:not(.disabled) {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
  svg {
    height: 30px;
    transform: translateY(-50%);
  }
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function MathSubmitButtonsRow({
  onReset,
  canSubmit,
}: MathSubmitButtonsRowProps) {
  const navigate = useNavigate();
  return (
    <StyledColumn>
      <SubmitButton
        // disabled={!canSubmit}
        type="submit"
        className={`${!canSubmit ? "disabled" : ""} icon`}
      >
        Calculate <BsArrowRightShort />
      </SubmitButton>
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
