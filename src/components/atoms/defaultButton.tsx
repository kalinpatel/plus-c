import styled from "styled-components";

export default styled.button`
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
  &.primary {
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
  }
`;
