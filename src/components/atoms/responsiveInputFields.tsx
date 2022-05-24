import styled from "styled-components";

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
  grid-gap: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  grid-column: span 1;
  gap: 20px;
  color: ${({ theme }) => theme.colors.themed.minor};
`;

export { InputContainer, InputSection };
