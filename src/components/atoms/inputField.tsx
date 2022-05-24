import { useEffect, useState } from "react";
import Tooltip from "react-power-tooltip";
import styled, { useTheme } from "styled-components";
import { v4 as uuid } from "uuid";

const Wrapper = styled.div`
  position: relative;
  height: 68px;
  margin: 0px;
  width: 100%;
  &.half {
    width: 50%;
  }
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  border: 2px solid ${({ theme }) => theme.colors.peripheral.grey};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border-top-left-radius: 0;
  padding: 8px;
  padding-left: 10px;
  margin: 0px;
  transition: border 0.2s ease-in-out;
  height: 24px;
  color: ${({ theme }) => theme.colors.themed.minor};
  position: absolute;
  top: 22px;
  left: 0;
  width: calc(100% - 22px);
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.brand.accent};
    outline: none;
    & + label {
      border-color: ${({ theme }) => theme.colors.brand.accent};
      &::before {
        background-color: ${({ theme }) => theme.colors.brand.accent};
      }
    }
  }
  &.math {
    font-family: "Lora", serif;
  }
  &:disabled {
    & + label {
      text-decoration: line-through;
    }
    opacity: 0.7;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  user-select: none;
  border-left: 2px solid;
  border-top: 2px solid;
  border-right: 2px solid;
  border-color: ${({ theme }) => theme.colors.peripheral.grey};
  transition: border 0.2s ease-in-out;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.default};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.default};
  color: ${({ theme }) => theme.colors.themed.minor};
  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 2px);
    height: 2px;
    background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
    top: 20px;
    left: 0;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: -2px;
    width: 2px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.peripheral.grey};
    z-index: 1;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.default};
    transition: background-color 0.2s ease-in-out;
  }
`;

const StyledTooltip = styled.span`
  color: ${({ theme }) => theme.colors.themed.minor};
  font-weight: 500;
  font-size: 0.95rem;
`;

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  tooltip?: string;
  math?: boolean;
  width?: "half" | "full";
  required?: boolean;
  onUserChange?: (value: string) => void;
  tooltipOnHover?: boolean;
}

export default function InputField({
  className,
  math,
  label,
  onUserChange,
  required,
  width,
  tooltip,
  tooltipOnHover,
  ...props
}: InputFieldProps) {
  const id = uuid();
  const [tooltipShown, setTooltipShown] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!tooltipOnHover) {
      setTooltipShown(false);
    }
  }, [tooltipOnHover]);

  return (
    <Wrapper
      className={`${width}`}
      onFocus={() => setTooltipShown(true)}
      onBlur={() => setTooltipShown(false)}
      onMouseEnter={() => tooltipOnHover && setTooltipShown(true)}
      onMouseLeave={() => tooltipOnHover && setTooltipShown(false)}
    >
      <StyledInput
        className={`${className} ${math ? "math" : ""}`}
        id={id}
        onChange={(e) => {
          if (onUserChange) {
            onUserChange(e.target.value);
          }
        }}
        required={required}
        {...props}
      />
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <Tooltip
        show={tooltipShown}
        static
        backgroundColor={
          theme.darkMode
            ? theme.colors.peripheral.extraDarkGrey
            : theme.colors.peripheral.extraLightGrey
        }
        // @ts-expect-error Border radius is a valid prop, but is not defined in the type
        borderRadius={theme.borderRadius.default}
        position="top start"
        arrowAlign="center"
      >
        <StyledTooltip>{tooltip}</StyledTooltip>
      </Tooltip>
    </Wrapper>
  );
}
